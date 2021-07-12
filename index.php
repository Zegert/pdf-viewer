<!doctype html>
<html lang="en">

<head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>PDF viewer</title>
        <!-- PDFJS -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.min.js"></script>
        <!-- Bootstrap -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                crossorigin="anonymous">
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
                integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
                crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
                integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
                crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
                integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
                crossorigin="anonymous"></script>
        <!-- JS -->
        <script type="text/javascript" src="index.js"></script>
        <link rel="stylesheet" href="style.css" />
</head>

<body>
        <?php $PDF ?>
        <div id="fixedAcceptHeader">
                <div class="container">
                        <div class="row">
                                <div class="col">
                                        <a class="btn btn-dark" href="<?= $PDF ?>" id="url-pdf"
                                                download="inhuisplaza">Opslaan
                                                als PDF bestand</a>
                                </div>
                                <div class="col">
                                        <div class="dropdown show">
                                                <a class="btn btn-dark dropdown-toggle" href="#" role="button"
                                                        id="dropdownMenuLink" data-toggle="dropdown"
                                                        aria-haspopup="true" aria-expanded="false">
                                                        Bestanden
                                                </a>

                                                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                        <a class="dropdown-item" id="dropdown-item" href="#"
                                                                onclick="showOtherPDFs('<?= $PDF ?>')">First PDF</a>
                                                        <?php foreach ($pdfs as $index => $pdf) { ?>
                                                        <a class="dropdown-item" id="dropdown-item-<?= $index ?>"
                                                                href="#" onclick="showOtherPDFs('<?= $pdf ?>')">Other
                                                                PDFs</a>
                                                        <?php } ?>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        </div>
        <div class="row canvas_container">
                <div id="canvas_container">
                </div>
        </div>
        <div class="row" id="pdf_controls">
                <div class="col text-center">
                        <div id="zoom_controls">
                                <button type="button" class="btn btn-dark" id="zoom_out">-</button>
                                <button type="button" class="btn btn-dark">Zoom</button>
                                <button type="button" class="btn btn-dark" id="zoom_in">+</button>
                        </div>
                </div>
        </div>
        <script>
        function showOtherPDFs(url) {
                document.getElementById('url-pdf').href = url;
        }
        </script>
</body>

</html>