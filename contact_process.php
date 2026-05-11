<?php

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method not allowed');
}

function field_value($key)
{
    return trim($_POST[$key] ?? '');
}

$name = field_value('name');
$email = filter_var(field_value('email'), FILTER_VALIDATE_EMAIL) ?: '';
$phone = field_value('phone') ?: field_value('number');
$subject = field_value('subject') ?: 'New request from Orbis Agro website';
$message = field_value('message') ?: 'Consultation request from short form.';

if ($name === '' || $phone === '') {
    http_response_code(400);
    exit('Please fill in name and phone.');
}

$to = 'info@orbis-agro.com';
$safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$safeEmail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$safePhone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$safeSubject = htmlspecialchars($subject, ENT_QUOTES, 'UTF-8');
$safeMessage = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));

$headers = "From: Orbis Agro <no-reply@orbis-agro.com>\r\n";
if ($email !== '') {
    $headers .= "Reply-To: {$email}\r\n";
}
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

$body = "<!doctype html><html lang='uk'><head><meta charset='UTF-8'><title>{$safeSubject}</title></head><body>";
$body .= "<h2>New website request</h2>";
$body .= "<p><strong>Name:</strong> {$safeName}</p>";
$body .= "<p><strong>Phone:</strong> {$safePhone}</p>";
if ($safeEmail !== '') {
    $body .= "<p><strong>Email:</strong> {$safeEmail}</p>";
}
$body .= "<p><strong>Subject:</strong> {$safeSubject}</p>";
$body .= "<p><strong>Message:</strong><br>{$safeMessage}</p>";
$body .= "</body></html>";

$sent = mail($to, $subject, $body, $headers);

if (!$sent) {
    http_response_code(500);
    exit('Message could not be sent.');
}

echo 'OK';
