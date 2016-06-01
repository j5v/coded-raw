# coded-raw
Delegates decoding to the data file, for a lighter client app. Should this be adopted, client apps will immediately support new file encodings, updated methods may readily replace the file's own methods, and a variety of encodings will be supported by any app that implements the simple umbrella format.

## Installation
Choose a sub-folder, copy it locally, and use a pass-through web server to host it. Then view the .html file in your browser.

## What does it do?
**coded-raw** comprises:
* an example **client app**;
* a **JavaScript library**, which dynamically loads and invokes the functional part of the file, to return flat output;
* a **data format** with associated **standards**.

Together, these parts allow a data file to render itself. The client app, rather than dealing with the encoded data natively, then accepts simple output, such as a flat bitmap or a text stream.

## This implementation: S0
The example provided in the `Demo-S0` folder is a simple client app that demonstrates the dynamic loading of a data file, calls the decoder, and shows the result in browser's Console. `S0` is the first implementation standard, and we've drafted standards `S1`, `S2`, and `S3`. The latter  will provide parameterised rendering and a choice of output formats.

## What's the clever bit?
It's a functional approach. We download the `json` data file, find out what standard it implements, then call its embedded decoder. Here's the best bit:

```JavaScript
CodedRaw = {
  getModule: function(filename, callback) { // callback is usually CodedRaw.render
    ...
    callback(JSON.parse(httpRequest.responseText));
    ...
  },
  render: function(mod) {
    ...
    var getVersion = new Function(mod.code.getVersion);
    ...
    var getContent = new Function('data', mod.code.getContent);
    return getContent(mod.data);
  }
}
```

## Concerns

In some environments, this might present security challenges. In a simple app in a browser environment, these concerns are reduced. Ideally, the JavaScript VM would limit the impact of potential scripting attacks.

## Website

http://johnvalentine.co.uk/coded_raw.php?art=intro
