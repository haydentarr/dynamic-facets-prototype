class AtsController < ApplicationController
  
  respond_to :json, :html
  # List the all profiles on index page which queried

  def index
    if $auth.present?
      @data ||= $auth.get('http://match.prod.svc.odesk.com/search/b/v1/profiles?q='+params[:query].to_s+'&dynamic_facets=true&paging=0;100&dynamic_facets_src=all_facets').read_body
    end
    if @data.present?
      @results = @data
      respond_with(@results)
    else
      respond_with(User.all)
    end
  end


  def get_hash(data)
    @hash_data = JSON.parse(data)
    return @hash_data
  end
end

