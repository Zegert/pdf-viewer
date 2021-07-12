document.addEventListener("DOMContentLoaded", function(event) {
    var url = document.querySelector('#url-pdf').href;

    const pdfjs = {
        scale: 2,
        rotate: 0,
        pdf: null,
        numPages: 0,
        currPage: 1,
        className: "canvas",
        maxScale: 4.5,
        minScale: 0.25,
        scaleJumps: 0.25,
    };
    if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
        const WORKER_URL =
            `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
        pdfjsLib.GlobalWorkerOptions.workerSrc = WORKER_URL;
    };
    pdfjsLib.getDocument(url).promise.then(function(pdf) {
        //Set PDFJS global object (so we can easily access in our page functions
        pdfjs.pdf = pdf;
        //How many pages it has
        pdfjs.numPages = pdf.numPages;
        //Start with first page
        pdf.getPage(pdfjs.currPage).then(handlePages);

    });

    function handlePages(page) {
        //This gives us the page's dimensions at full scale
        console.log("Scale: " + pdfjs.scale + " -- Current page: " + pdfjs.currPage + " -- Total amount of pages: " + pdfjs.numPages);
        var viewport = page.getViewport({ scale: pdfjs.scale, rotation: pdfjs.rotate, offsetX: 0 });

        //We'll create a canvas for each page to draw it on
        var canvas = document.createElement("canvas");
        canvas.classList.add(pdfjs.className);
        canvas.style.display = "block";
        var context = canvas.getContext('2d');

        canvas.height = viewport.height;
        canvas.width = viewport.width;
        //Draw it on the canvas
        page.render({ canvasContext: context, viewport: viewport });
        //Add it to the web page
        document.getElementById("canvas_container").appendChild(canvas);
        //Move to next page
        pdfjs.currPage++;
        if (pdfjs.pdf !== null && pdfjs.currPage <= pdfjs.numPages) {
            pdfjs.pdf.getPage(pdfjs.currPage).then(handlePages);
        }
    }

    function removeElementsByClass(className) {
        const elements = document.getElementsByClassName(className);
        pdfjs.currPage = 1;
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
    }

    document.getElementById("zoom_in").addEventListener("click", function() {
        if (pdfjs.scale >= pdfjs.maxScale) {
            window.alert("U kunt niet verder inzoomen.");
        } else {
            removeElementsByClass(pdfjs.className);
            pdfjs.scale = pdfjs.scale = pdfjs.scale + pdfjs.scaleJumps;

            pdfjs.pdf.getPage(pdfjs.currPage).then(handlePages);
        }
    });

    document.getElementById("zoom_out").addEventListener("click", function() {
        if (pdfjs.scale <= pdfjs.minScale) {
            window.alert("U kunt niet verder uitzoomen.");
        } else {
            removeElementsByClass(pdfjs.className);
            pdfjs.scale = pdfjs.scale = pdfjs.scale - pdfjs.scaleJumps;
            pdfjs.pdf.getPage(pdfjs.currPage).then(handlePages);
        }
    });

    $(".dropdown-item").each((index, item) => {
        $(item).on("click", function(e) {
            e.preventDefault();
            removeElementsByClass(pdfjs.className);
            var url = document.querySelector('#url-pdf').href;
            pdfjsLib.getDocument(url).promise.then(function(pdf) {
                pdfjs.pdf = pdf;
                pdfjs.numPages = pdf.numPages;
                pdf.getPage(pdfjs.currPage).then(handlePages);
            })
        })
    });
});