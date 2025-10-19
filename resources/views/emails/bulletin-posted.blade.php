<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: 'Georgia', serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5dc;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, 
                {{ $bulletin->priority === 'high' ? '#d32f2f' : '#8B4513' }} 0%, 
                {{ $bulletin->priority === 'high' ? '#c62828' : '#A0522D' }} 100%);
            color: #FFD700;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .content {
            background: white;
            padding: 30px;
            border-radius: 0 0 10px 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            @if($bulletin->priority === 'high')
                border-left: 6px solid #d32f2f;
            @endif
        }
        .bulletin-title {
            color: {{ $bulletin->priority === 'high' ? '#d32f2f' : '#8B4513' }};
            font-size: 22px;
            margin-bottom: 15px;
        }
        .badge {
            display: inline-block;
            padding: 5px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
            margin-right: 8px;
            margin-bottom: 15px;
        }
        .message-box {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            white-space: pre-wrap;
        }
        .footer {
            text-align: center;
            padding: 20px;
            color: #666;
            font-size: 12px;
        }
        .urgent-notice {
            background-color: #ffebee;
            border: 2px solid #d32f2f;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: center;
            font-weight: 600;
            color: #d32f2f;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>☦ @if($bulletin->priority === 'high')⚠️ URGENT @endif Bulletin Notice</h1>
        </div>
        <div class="content">
            @if($bulletin->priority === 'high' || $bulletin->type === 'urgent')
                <div class="urgent-notice">
                    ⚠️ This is a high priority bulletin - please read immediately
                </div>
            @endif

            <h2 class="bulletin-title">{{ $bulletin->title }}</h2>
            
            <div>
                <span class="badge" style="background-color: 
                    {{ $bulletin->type === 'urgent' ? '#ffcdd2' : '#e3f2fd' }}; 
                    color: {{ $bulletin->type === 'urgent' ? '#d32f2f' : '#1976d2' }};">
                    {{ ucfirst(str_replace('_', ' ', $bulletin->type)) }}
                </span>
                <span class="badge" style="background-color: 
                    {{ $bulletin->priority === 'high' ? '#ffcdd2' : ($bulletin->priority === 'normal' ? '#e3f2fd' : '#f5f5f5') }}; 
                    color: {{ $bulletin->priority === 'high' ? '#d32f2f' : ($bulletin->priority === 'normal' ? '#1976d2' : '#666') }};">
                    {{ ucfirst($bulletin->priority) }} Priority
                </span>
            </div>
            
            <div class="message-box">
                {{ $bulletin->message }}
            </div>
            
            @if($bulletin->expires_at)
                <p style="color: #d32f2f; font-size: 14px; margin-top: 20px;">
                    ⏰ <strong>Expires:</strong> {{ $bulletin->expires_at->format('F j, Y g:i A') }}
                </p>
            @endif
            
            <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 14px;">
                <strong>Posted by:</strong> {{ $bulletin->poster->name }}<br>
                <strong>Posted on:</strong> {{ $bulletin->created_at->format('F j, Y g:i A') }}
            </p>
        </div>
        <div class="footer">
            <p>You're receiving this email because you have email notifications enabled.</p>
            <p>To manage your notification preferences, visit your Account Settings.</p>
        </div>
    </div>
</body>
</html>

