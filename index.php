<?php
    $assets = file_get_contents("./dist/manifest.json");
    $assets = json_decode($assets);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="/dist/<?=$assets->main[0]?>">
    <title>Document</title>
</head>
<body>
    <h1>main</h1>
    
    <h2>ohoh~</h2>

    <div class="whiteNoise"></div>
    <script src="/dist/<?=$assets->main[1]?>"></script>
</body>
</html>