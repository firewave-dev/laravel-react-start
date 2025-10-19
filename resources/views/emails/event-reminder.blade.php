<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ __('Event Reminder') }}</title>
    <style>
        body {
            font-family: 'Georgia', serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f9fa;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: normal;
        }
        .content {
            padding: 30px 20px;
        }
        .event-card {
            border: 2px solid #D4AF37;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            background: #fefefe;
        }
        .event-title {
            font-size: 20px;
            font-weight: bold;
            color: #8B4513;
            margin-bottom: 10px;
        }
        .event-details {
            margin: 15px 0;
        }
        .event-details strong {
            color: #8B4513;
        }
        .event-description {
            margin-top: 15px;
            padding: 15px;
            background: #f8f9fa;
            border-left: 4px solid #D4AF37;
            border-radius: 4px;
        }
        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            color: #666;
            font-size: 14px;
        }
        .btn {
            display: inline-block;
            padding: 12px 24px;
            background: #D4AF37;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            margin: 15px 0;
        }
        .btn:hover {
            background: #B8860B;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>{{ __('Event Reminder') }}</h1>
            <p>{{ __('Don\'t miss this upcoming event!') }}</p>
        </div>
        
        <div class="content">
            <p>{{ __('Hello!') }}</p>
            <p>{{ __('This is a friendly reminder about an upcoming event:') }}</p>
            
            <div class="event-card">
                <div class="event-title">{{ $event->title }}</div>
                
                <div class="event-details">
                    <strong>{{ __('Date:') }}</strong> {{ $event->event_date ? $event->event_date->format('F j, Y') : 'TBA' }}<br>
                    @if($event->start_time)
                        <strong>{{ __('Time:') }}</strong> {{ $event->start_time }}@if($event->end_time) - {{ $event->end_time }}@endif<br>
                    @endif
                    @if($event->location)
                        <strong>{{ __('Location:') }}</strong> {{ $event->location }}<br>
                    @endif
                    @if($event->event_type)
                        <strong>{{ __('Type:') }}</strong> {{ ucfirst($event->event_type) }}<br>
                    @endif
                </div>
                
                @if($event->description)
                    <div class="event-description">
                        <strong>{{ __('Description:') }}</strong><br>
                        {!! nl2br(e($event->description)) !!}
                    </div>
                @endif
            </div>
            
            <p>{{ __('We look forward to seeing you there!') }}</p>
            
            <div style="text-align: center;">
                <a href="{{ route('calendar') }}" class="btn">{{ __('View All Events') }}</a>
            </div>
        </div>
        
        <div class="footer">
            <p>{{ __('Best regards,') }}<br>{{ config('app.name') }}</p>
            <p><small>{{ __('This is an automated message. Please do not reply to this email.') }}</small></p>
        </div>
    </div>
</body>
</html>
