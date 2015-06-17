require 'json'
require 'omniauth-oauth'

module OmniAuth
  module Strategies
    class Upwork < OmniAuth::Strategies::OAuth
      # Strategy name
      option :name, "upwork"

      # Options being passed to initialize client from the OAuth Gem.
      # Reference: https://github.com/oauth-xx/oauth-ruby
      option :client_options, {
          site: "https://www.upwork.com",
          request_token_path: "/api/auth/v1/oauth/token/request",
          authorize_path: "/services/api/auth",
          access_token_path: "/api/auth/v1/oauth/token/access"
      }

      # Called after authentication has succeeded.
      uid {
        raw_info['id']
      }

      info do
        {
          first_name: raw_info['first_name'],
          last_name: raw_info['last_name'],
          email: raw_info['email'],
          status: raw_info['status'],
          profile_key: raw_info['profile_key']
        }
      end

      extra do
        {
          'raw_info' => raw_info
        }
      end

      def raw_info
        # Reference: https://www.elance.com/q/api2/methods/profiles/my
        raw_info = access_token.get('/api/hr/v2/users/me.json')

        data = raw_info.read_body
        data = (data ? JSON.parse(data) : {} )
        data['user'] || {}
      end
    end
  end
end