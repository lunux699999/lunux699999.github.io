<?php
header("Content-Type: application/json");

// LeakCheck API Key (replace with yours)
$api_key = "1ee95568f758781d9313fa5457fa1e6b90e8d289";
$leakcheck_url = "https://leakcheck.io/api";

// Get POST data
$query = $_POST['query'] ?? '';
$type = $_POST['type'] ?? 'email';

if (empty($query)) {
    echo json_encode(["error" => "No query provided"]);
    exit();
}

// Make API request
$params = http_build_query([
    "key" => $api_key,
    "check" => $query,
    "type" => $type
]);

$response = file_get_contents("$leakcheck_url?$params");
echo $response;
?>