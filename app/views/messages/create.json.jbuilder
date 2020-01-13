json.body @message.body
json.image @message.image.url
json.date @message.created_at.to_s
json.user_name @message.user.name