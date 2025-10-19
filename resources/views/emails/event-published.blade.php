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
            background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
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
        }
        .event-title {
            color: #8B4513;
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
        .event-details {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .detail-row {
            display: flex;
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }
        .detail-row:last-child {
            border-bottom: none;
        }
        .detail-label {
            font-weight: 600;
            color: #8B4513;
            min-width: 120px;
        }
        .button {
            display: inline-block;
            padding: 12px 30px;
            background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
            color: #1a1f2e;
            text-decoration: none;
            border-radius: 25px;
            font-weight: 600;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            padding: 20px;
            color: #666;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>☦ New Event Announced</h1>
        </div>
        <div class="content">
            <h2 class="event-title">{{ $event->title }}</h2>
            
            <div>
                <span class="badge" style="background-color: #e3f2fd; color: #1976d2;">
                    {{ ucfirst($event->event_type) }}
                </span>
                @if($event->is_featured)
                    <span class="badge" style="background-color: #fff9c4; color: #f57f17;">Featured</span>
                @endif
            </div>
            
            @if($event->description)
                <p>{{ $event->description }}</p>
            @endif
            
            <div class="event-details">
                <div class="detail-row">
                    <span class="detail-label">📅 Date:</span>
                    <span>{{ $event->event_date->format('l, F j, Y') }}</span>
                </div>
                @if($event->start_time)
                    <div class="detail-row">
                        <span class="detail-label">🕐 Time:</span>
                        <span>{{ $event->start_time }}@if($event->end_time) - {{ $event->end_time }}@endif</span>
                    </div>
                @endif
                @if($event->location)
                    <div class="detail-row">
                        <span class="detail-label">📍 Location:</span>
                        <span>{{ $event->location }}</span>
                    </div>
                @endif
                @if($event->is_recurring && $event->recurrence_pattern)
                    <div class="detail-row">
                        <span class="detail-label">🔄 Recurrence:</span>
                        <span>{{ $event->recurrence_pattern }}</span>
                    </div>
                @endif
            </div>
            
            <div style="text-align: center;">
                <a href="{{ url('/calendar') }}" class="button">
                    View Full Calendar
                </a>
            </div>
        </div>
        <div class="footer">
            <p>You're receiving this email because you have email notifications enabled.</p>
            <p>To manage your notification preferences, visit your Account Settings.</p>
        </div>
    </div>
</body>
</html>

