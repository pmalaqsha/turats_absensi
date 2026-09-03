package com.example

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import android.util.Log
import android.webkit.ConsoleMessage
import android.webkit.PermissionRequest
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.systemBarsPadding
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.content.ContextCompat
import com.example.ui.theme.MyApplicationTheme

class MainActivity : ComponentActivity() {

  private var fileChooserCallback: ValueCallback<Array<Uri>>? = null
  private var pendingPermissionRequest: PermissionRequest? = null

  private val filePickerLauncher = registerForActivityResult(
    ActivityResultContracts.StartActivityForResult()
  ) { result ->
    val uriResult = WebChromeClient.FileChooserParams.parseResult(result.resultCode, result.data)
    fileChooserCallback?.onReceiveValue(uriResult)
    fileChooserCallback = null
  }

  private val cameraPermissionLauncher = registerForActivityResult(
    ActivityResultContracts.RequestPermission()
  ) { isGranted ->
    if (isGranted) {
      pendingPermissionRequest?.grant(pendingPermissionRequest?.resources)
    } else {
      pendingPermissionRequest?.deny()
    }
    pendingPermissionRequest = null
  }

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    enableEdgeToEdge()
    setContent {
      MyApplicationTheme {
        Surface(
          modifier = Modifier
            .fillMaxSize()
            .systemBarsPadding()
            .imePadding()
        ) {
          AbsensiWebView(
            onShowFileChooser = { callback, params ->
              fileChooserCallback?.onReceiveValue(null)
              fileChooserCallback = callback
              try {
                val intent = params.createIntent()
                filePickerLauncher.launch(intent)
                true
              } catch (e: Exception) {
                try {
                  val fallbackIntent = Intent(Intent.ACTION_GET_CONTENT).apply {
                    addCategory(Intent.CATEGORY_OPENABLE)
                    type = "image/*"
                  }
                  filePickerLauncher.launch(Intent.createChooser(fallbackIntent, "Pilih Foto / Kamera"))
                  true
                } catch (fallbackEx: Exception) {
                  fileChooserCallback?.onReceiveValue(null)
                  fileChooserCallback = null
                  false
                }
              }
            },
            onPermissionRequest = { request ->
              if (request.resources.contains(PermissionRequest.RESOURCE_VIDEO_CAPTURE)) {
                if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED) {
                  request.grant(request.resources)
                } else {
                  pendingPermissionRequest = request
                  cameraPermissionLauncher.launch(Manifest.permission.CAMERA)
                }
              } else {
                request.grant(request.resources)
              }
            }
          )
        }
      }
    }
  }
}

@Composable
fun AbsensiWebView(
  onShowFileChooser: (ValueCallback<Array<Uri>>?, WebChromeClient.FileChooserParams) -> Boolean,
  onPermissionRequest: (PermissionRequest) -> Unit,
  modifier: Modifier = Modifier
) {
  var webViewInstance by remember { mutableStateOf<WebView?>(null) }

  BackHandler(enabled = webViewInstance?.canGoBack() == true) {
    webViewInstance?.goBack()
  }

  AndroidView(
    modifier = modifier.fillMaxSize(),
    factory = { context ->
      WebView(context).apply {
        isScrollbarFadingEnabled = true
        isVerticalScrollBarEnabled = true

        settings.apply {
          javaScriptEnabled = true
          domStorageEnabled = true
          allowFileAccess = true
          allowContentAccess = true
          mediaPlaybackRequiresUserGesture = false
          mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
          cacheMode = WebSettings.LOAD_DEFAULT
          useWideViewPort = true
          loadWithOverviewMode = true
          displayZoomControls = false
          builtInZoomControls = false
        }

        webViewClient = object : WebViewClient() {
          override fun onReceivedError(
            view: WebView?,
            request: WebResourceRequest?,
            error: WebResourceError?
          ) {
            super.onReceivedError(view, request, error)
            Log.w("AbsensiWebView", "WebView resource error: ${error?.description} on ${request?.url}")
          }
        }

        webChromeClient = object : WebChromeClient() {
          override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
            Log.d("AbsensiWebView", "${consoleMessage?.message()} -- line ${consoleMessage?.lineNumber()} of ${consoleMessage?.sourceId()}")
            return true
          }

          override fun onPermissionRequest(request: PermissionRequest) {
            onPermissionRequest(request)
          }

          override fun onShowFileChooser(
            webView: WebView?,
            filePathCallback: ValueCallback<Array<Uri>>?,
            fileChooserParams: FileChooserParams?
          ): Boolean {
            return if (fileChooserParams != null) {
              onShowFileChooser(filePathCallback, fileChooserParams)
            } else {
              filePathCallback?.onReceiveValue(null)
              false
            }
          }
        }

        loadUrl("file:///android_asset/index.html")
        webViewInstance = this
      }
    },
    update = { webView ->
      webViewInstance = webView
    }
  )
}

