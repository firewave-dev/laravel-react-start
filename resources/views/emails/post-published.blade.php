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
        .post-title {
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
            margin-bottom: 15px;
        }
        .badge-category {
            background-color: #e3f2fd;
            color: #1976d2;
        }
        .excerpt {
            color: #666;
            font-style: italic;
            padding: 15px;
            background-color: #f9f9f9;
            border-left: 4px solid #8B4513;
            margin: 20px 0;
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
            <h1>☦ New Post Published</h1>
        </div>
        <div class="content">
            <h2 class="post-title">{{ $post->title }}</h2>
            
            <span class="badge badge-category">{{ ucfirst(str_replace('_', ' ', $post->category)) }}</span>
            
            @if($post->excerpt)
                <div class="excerpt">
                    {{ $post->excerpt }}
                </div>
            @endif
            
            <p>
                A new post has been published on our church website. 
                Click the button below to read the full article.
            </p>
            
            <div style="text-align: center;">
                <a href="{{ url('/blog/' . $post->slug) }}" class="button">
                    Read Full Post
                </a>
            </div>
            
            <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 14px;">
                <strong>Author:</strong> {{ $post->author->name }}<br>
                <strong>Published:</strong> {{ $post->published_at->format('F j, Y') }}
            </p>
        </div>
        <div class="footer">
            <p>You're receiving this email because you have email notifications enabled.</p>
            <p>To manage your notification preferences, visit your Account Settings.</p>
        </div>
    </div>
</body>
</html>

