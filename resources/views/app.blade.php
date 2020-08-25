<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>iNaturalist Data Visualizer</title>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="/css/app.css">
        <script src="https://d3js.org/d3.v5.min.js"></script>
    </head>

    <body class="font-sans">
        <div id="app">
            <div class="container px-8 pb-32">
                <main class="flex">
                    <aside class="w-1/6 pt-8">
                        <section class="mb-10">
                            <h5 class="text-base  uppercase font-bold mb-5">menu</h5>
                            <ul class="list-reset">
                                <li class="text-sm leading-loose text-black"><router-link to="./" exact>Home</router-link></li>
                                <li class="text-sm leading-loose text-black"><router-link to="./upload">Upload</router-link></li>
                                <li class="text-sm leading-loose text-black" v-if="data_set"><router-link to="./users">Users</router-link></li>
                                <li class="text-sm leading-loose text-black" v-if="data_set"><router-link to="./temporal">Temporal</router-link></li>
                                <li class="text-sm leading-loose text-black" v-if="data_set"><router-link to="./spatial">Spatial</router-link></li>
                                <li class="text-sm leading-loose text-black" v-if="data_set"><router-link to="./taxonomic">Taxonomic</router-link></li>
                            </ul>
                        </section>
                    </aside>
                    <div class="w-5/6 primary flex-1">
                        <router-view></router-view>
                    </div>
                </main>

            </div>

        </div>
        <script type="text/javascript" src="/js/app.js"></script>
    </body>
</html>
