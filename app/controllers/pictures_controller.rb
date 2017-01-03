class PicturesController < ApplicationController
  def index
 @pictures = Picture.where("polisa_id = ?", session[:polisaid])
 respond_to do |format|
    format.html
    format.json { render :json => @pictures.collect { |p| p.to_jq_upload }.to_json }
  end

end

def rysuj_zdjecia
  @pictures = Picture.where("polisa_id = ?", session[:polisaid])
  respond_to do |format|
     format.html
     format.json { render :json => @pictures.collect { |p| p.to_jq_upload }.to_json }
   end
end

def create
  params[:files]['avatar'].each do |a|
     @picture = Picture.new()
     @picture.avatar = a
     @picture.polisa_id = session[:polisaid]
     if @picture.save
       respond_to do |format|
          format.html {
          render :json => [@picture.to_jq_upload].to_json,
         :content_type => 'text/html',
             :layout => false
           }
           format.json {
             render :json => { :files => [@picture.to_jq_upload] }
           }
         end
       else
         render :json => [{:error => "custom_failure"}], :status => 304
       end
  end
 end


def destroy
 @picture = Picture.find(params[:id])
 @picture.destroy
 render :json => true
end
 private
def picture_params
   params.require(:picture).permit(:files)
 end
end
