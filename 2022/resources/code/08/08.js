function runAfterLoadingPage(tk) {
    let urlParameters = (new URL(document.location)).searchParams;
    if (urlParameters.has('title')) {
        // Displaying the results instead
        let title = urlParameters.get('title');
        let composer = urlParameters.get("composer");
        let timesig = urlParameters.get("timesig");
        let keysig = urlParameters.get("keysig");
        let notes = urlParameters.get("notes");
        let score = `X:1\nT:${title}\nC:${composer}\nM:${timesig}\nK:${keysig}\n${notes}`
        let svg = tk.renderData(score, {});
        document.getElementById('notation').innerHTML = svg;
    }
}

document.addEventListener("DOMContentLoaded", (event) => {
    Module.onRuntimeInitialized = async _ => {
        let tk = new verovio.toolkit();
        console.log("Verovio has loaded!");
        tk.setOptions({
            scale: 60,
            landscape: true,
            adjustPageWidth: true
        });
        tk.renderToSVG
        console.log("Verovio options:", tk.getOptions());
        document.getElementById("loadingmsg").hidden = true;
        document.getElementById("theform").hidden = false;
        runAfterLoadingPage(tk);
    }
});
