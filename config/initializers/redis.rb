if ENV["redis://rediscloud:3GGBH2utpBSYz1cD@pub-redis-11152.us-east-1-3.4.ec2.garantiadata.com:11152"]
    $redis = Redis.new(:url => ENV["redis://rediscloud:3GGBH2utpBSYz1cD@pub-redis-11152.us-east-1-3.4.ec2.garantiadata.com:11152"])
end