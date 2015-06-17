OmniAuth.config.logger = Rails.logger

# Rails.application.config.middleware.use OmniAuth::Builder do
#   provider :odesk, 'd6d726ea3a48b18d74bf7a177876dab1', 'ed57cce1179fdf61'
# end

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :upwork, ENV['UPWORK_CONSUMER_KEY'], ENV['UPWORK_CONSUMER_SECRET'] # as freelancer
end