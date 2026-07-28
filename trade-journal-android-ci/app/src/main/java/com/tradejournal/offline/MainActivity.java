package com.tradejournal.offline;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.print.PrintAttributes;
import android.print.PrintManager;
import android.util.Base64;
import android.webkit.JavascriptInterface;
import android.webkit.MimeTypeMap;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.Toast;
import org.json.JSONObject;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

public class MainActivity extends Activity {
    private static final String ORIGIN = "https://app.local";
    private static final int SAVE_FILE = 8101;
    private static final int OPEN_BACKUP = 8102;
    private WebView webView;
    private WebView printWebView;
    private byte[] pendingBytes;
    private String pendingMime;

    @Override protected void onCreate(Bundle state) {
        super.onCreate(state);
        getWindow().setStatusBarColor(Color.rgb(8,17,31));
        getWindow().setNavigationBarColor(Color.rgb(8,17,31));
        FrameLayout root = new FrameLayout(this);
        webView = new WebView(this);
        root.addView(webView, new FrameLayout.LayoutParams(-1,-1));
        setContentView(root);
        configure();
        webView.loadUrl(ORIGIN + "/index.html");
    }

    @SuppressLint({"SetJavaScriptEnabled","JavascriptInterface"})
    private void configure() {
        WebSettings s = webView.getSettings();
        s.setJavaScriptEnabled(true); s.setDomStorageEnabled(true); s.setDatabaseEnabled(true);
        s.setAllowFileAccess(false); s.setAllowContentAccess(false); s.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        s.setSupportZoom(false); s.setTextZoom(100); s.setDefaultTextEncodingName("UTF-8"); s.setSafeBrowsingEnabled(true);
        webView.setBackgroundColor(Color.rgb(8,17,31));
        webView.addJavascriptInterface(new Bridge(), "Android");
        webView.setWebViewClient(new WebViewClient() {
            @Override public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl(); if (!"app.local".equals(uri.getHost())) return null;
                String path = uri.getPath(); if (path == null || path.equals("/")) path = "/index.html";
                path = path.substring(1); if (path.contains("..")) return response404();
                try {
                    InputStream in = getAssets().open("www/" + path);
                    Map<String,String> headers = new HashMap<>(); headers.put("Cache-Control","no-store");
                    return new WebResourceResponse(mime(path),"UTF-8",200,"OK",headers,in);
                } catch (Exception e) { return response404(); }
            }
            @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                if ("app.local".equals(request.getUrl().getHost())) return false;
                startActivity(new Intent(Intent.ACTION_VIEW, request.getUrl())); return true;
            }
        });
    }

    private WebResourceResponse response404() {
        return new WebResourceResponse("text/plain","UTF-8",404,"Not Found",new HashMap<>(),new ByteArrayInputStream("Not found".getBytes(StandardCharsets.UTF_8)));
    }
    private String mime(String path) {
        String ext = MimeTypeMap.getFileExtensionFromUrl(path); String m = MimeTypeMap.getSingleton().getMimeTypeFromExtension(ext == null ? "" : ext.toLowerCase(Locale.ROOT));
        if (m != null) return m; if (path.endsWith(".js")) return "application/javascript"; if (path.endsWith(".css")) return "text/css"; return "application/octet-stream";
    }

    public class Bridge {
        @JavascriptInterface public void saveFile(String name,String mime,String base64) {
            runOnUiThread(() -> { pendingBytes = Base64.decode(base64,Base64.DEFAULT); pendingMime = mime; Intent i = new Intent(Intent.ACTION_CREATE_DOCUMENT); i.addCategory(Intent.CATEGORY_OPENABLE); i.setType(mime); i.putExtra(Intent.EXTRA_TITLE,name); startActivityForResult(i,SAVE_FILE); });
        }
        @JavascriptInterface public void openBackup() {
            runOnUiThread(() -> { Intent i = new Intent(Intent.ACTION_OPEN_DOCUMENT); i.addCategory(Intent.CATEGORY_OPENABLE); i.setType("application/json"); startActivityForResult(i,OPEN_BACKUP); });
        }
        @JavascriptInterface public void printHtml(String title,String html) { runOnUiThread(() -> print(title,html)); }
        @JavascriptInterface public void showToast(String text) { runOnUiThread(() -> Toast.makeText(MainActivity.this,text,Toast.LENGTH_SHORT).show()); }
        @JavascriptInterface public String getVersion() { return BuildConfig.VERSION_NAME; }
    }

    @Override protected void onActivityResult(int requestCode,int resultCode,Intent data) {
        super.onActivityResult(requestCode,resultCode,data); if (resultCode != RESULT_OK || data == null || data.getData() == null) return;
        Uri uri = data.getData();
        try {
            if (requestCode == SAVE_FILE) {
                try (OutputStream out = getContentResolver().openOutputStream(uri,"w")) { out.write(pendingBytes); out.flush(); }
                Toast.makeText(this,"فایل ذخیره شد ✅",Toast.LENGTH_SHORT).show();
            } else if (requestCode == OPEN_BACKUP) {
                byte[] bytes; try (InputStream in = getContentResolver().openInputStream(uri)) { bytes = readAll(in); }
                String encoded = Base64.encodeToString(bytes,Base64.NO_WRAP);
                webView.evaluateJavascript("window.receiveBackup(" + JSONObject.quote(encoded) + ")",null);
            }
        } catch (Exception e) { Toast.makeText(this,"عملیات فایل ناموفق بود",Toast.LENGTH_LONG).show(); }
    }
    private byte[] readAll(InputStream in) throws Exception { ByteArrayOutputStream out = new ByteArrayOutputStream(); byte[] b = new byte[8192]; int n; while((n=in.read(b))!=-1) out.write(b,0,n); return out.toByteArray(); }

    @SuppressLint("SetJavaScriptEnabled") private void print(String title,String html) {
        PrintManager manager = (PrintManager)getSystemService(PRINT_SERVICE); printWebView = new WebView(this); printWebView.getSettings().setDefaultTextEncodingName("UTF-8");
        printWebView.setWebViewClient(new WebViewClient(){ boolean done; @Override public void onPageFinished(WebView v,String url){ if(done)return; done=true; String job=(title==null||title.isEmpty())?"گزارش ژورنال ترید":title; manager.print(job,v.createPrintDocumentAdapter(job),new PrintAttributes.Builder().setMediaSize(PrintAttributes.MediaSize.ISO_A4).setColorMode(PrintAttributes.COLOR_MODE_COLOR).build()); }});
        printWebView.loadDataWithBaseURL(ORIGIN+"/print/",html,"text/html","UTF-8",null);
    }

    @Override public void onBackPressed() { webView.evaluateJavascript("window.appBack?window.appBack():false",v->{ if(!"true".equals(v)){ if(webView.canGoBack())webView.goBack(); else MainActivity.super.onBackPressed(); }}); }
    @Override protected void onDestroy(){ if(webView!=null)webView.destroy(); if(printWebView!=null)printWebView.destroy(); super.onDestroy(); }
}
