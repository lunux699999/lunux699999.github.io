<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-Type: application/json");

// LeakCheck API Key (Replace with your real key)
$api_key = "1ee95568f758781d9313fa5457fa1e6b90e8d289";
$leakcheck_url = "https://leakcheck.io/api";

// Get query parameters
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

// Debugging: Log raw API response
file_put_contents("debug_log.txt", $response);

if (!$response) {
    echo json_encode(["error" => "Failed to reach LeakCheck API"]);
    exit();
}

echo $response;
?>
