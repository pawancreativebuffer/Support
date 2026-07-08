$apiKey = "sk_1dc8c0a2c008dc157d2175716360996b9f09e5dff34245b0"
$agentId = "agent_6401kwm3cms1fxaa0dp0mszb5p58"

$resp = Invoke-WebRequest -Uri "https://api.elevenlabs.io/v1/convai/conversations?agent_id=$agentId" -Headers @{'xi-api-key'=$apiKey} -UseBasicParsing
$data = $resp.Content | ConvertFrom-Json

Write-Output "=== YOUR STORED VOICE CONVERSATIONS ON ELEVENLABS ==="
Write-Output "Total found: $($data.conversations.Count)"
Write-Output ""

foreach ($conv in $data.conversations) {
    Write-Output "Conversation ID : $($conv.conversation_id)"
    Write-Output "Status          : $($conv.status)"
    Write-Output "Duration        : $($conv.call_duration_secs) seconds"
    Write-Output "Started At      : $($conv.start_time_unix_secs)"
    Write-Output "Audio Available : Check via /api/voice-audio?conversation_id=$($conv.conversation_id)"
    Write-Output "---"
}
