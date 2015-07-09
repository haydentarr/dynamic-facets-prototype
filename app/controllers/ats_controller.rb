class AtsController < ApplicationController
  
  respond_to :json, :html
  # List the all profiles on index page which queried

  def index
    if $auth.present?
      @data ||= $auth.get('http://match.prod.svc.odesk.com/search/b/v1/profiles?q='+params[:query].to_s+'&predicted_tier='+params[:exp].to_s+'&dynamic_facets=true&paging=0;100&dynamic_facets_src=all_facets').read_body
      #@data ||= $auth.get('/api/profiles/v2/search/providers.json?q='+params[:query].to_s+'&dynamic_facets=true&paging=0;100&dynamic_facets_src=all_facets').read_body
      #@data ||= $auth.get('/api/profiles/v2/search/providers.json?dynamic_facets=true&q=php&profile_access=public,auth&preserve_facet=all').read_body
    end
    if @data.present?
      @results = @data
      respond_with(@results)
    else
      respond_with(User.all)
    end
  end
end
