<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>iNaturalist Data Visualizer</title>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="/css/bootstrap.min.css">
        <script src="https://d3js.org/d3.v5.min.js"></script>
        <style type="text/css">
            .btn-info{
                color:white !important;
            }
            .router-link-exact-active{
                background-color: lightblue !important;
                color:steelblue !important;

            }
        </style>
    </head>

    <body class="bg-dark">
        <div id="app">
            <div class="container mt-2">
                <div class="row">
                    <div class="btn-group mx-auto">
                        <router-link class="btn btn-lg btn-info" to="./" exact>Home</router-link>
                        <router-link class="btn btn-lg btn-info" to="./upload">Upload</router-link>
                        <router-link class="btn btn-lg btn-info on-data-set" to="./users">Users</router-link>
                        <router-link class="btn btn-lg btn-info on-data-set" to="./temporal">Temporal</router-link>
                        <router-link class="btn btn-lg btn-info on-data-set" to="./spatial">Spatial</router-link>
                        <router-link class="btn btn-lg btn-info on-data-set" to="./taxonomic">Taxonomic</router-link>
                    </div>
                </div>
                <div class="row">
                    <div class="col bg-light">
                        <router-view></router-view>
                    </div>
                </div>

            </div>

        </div>
        <script type="text/javascript" src="/js/app.js"></script>
    </body>
</html>
