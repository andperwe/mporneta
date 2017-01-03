class MagazynsController < ApplicationController
  before_action :authenticate_user!
  layout 'bez_dodaj_op'
  before_action :set_magazyn, only: [:edit, :update, :destroy]

  def index
    @towarzystwa = Towarzystwo.order(:nazwa).all
    @nazwa_dr = NazwaDr.all
    @users = User.all
    @stans = Stan.all
    respond_to do |format|
      format.html
    end
  end

  def datatable_ajax
    respond_to do |format|
        format.json {render json: MagazynDatatable.new(view_context)}
    end
  end

  def datatable_ajax2
    respond_to do |format|
         format.json {render json: MagazynHDatatable.new(view_context)}
    end
  end

  def edit
    @magazyn = Magazyn.find(params[:id])
    @magazyn.user_id = current_user.id
    if params[:typ].to_i == 0
       respond_to do |format|
            format.js {  render action: "edit" }
       end
    else
      respond_to do |format|
           format.js {  render action: "historia" }
      end
    end
  end

  def new
    @towarzystwa = Towarzystwo.order(:nazwa).all
    @nazwa_dr = NazwaDr.all
    @users = User.all
    @stans = Stan.all
  end

  def zmien
    @output = 0
   @magazyn = Magazyn.find(params[:id])
   if @magazyn.stan_id.to_i == 2 #sprzedany
       @output = 1
   elsif params[:stan_id] == 2
      @output = 2
   else
     @zmiana_tu = 0
     @zmiana_dok = 0
     @zmiana_stanu = 0
     if params[:towarzystwo_id].to_i != @magazyn.towarzystwo_id.to_i
         @zmiana_tu=1 # zmiana tu
      end
      if params[:nazwa_dr_id].to_i != @magazyn.nazwa_dr_id.to_i
        @zmiana_dok = 1 # zmiana typ dok
      end
      if params[:stan_id].to_i != @magazyn.stan_id.to_i
        @zmiana_stanu = 1 # zmiana stanu
      end

      if @zmiana_dok == 0 && @zmiana_tu == 0 && @zmiana_stanu == 0
        @output = 3
      else
        if @zmiana_tu == 1
            # sprawdź czy istnieje taki numer w nowym towarzystwie
          if  Magazyn.where("numer = ? AND towarzystwo_id = ? and nazwa_dr_id = ?", @magazyn.numer, params[:towarzystwo_id], params[:nazwa_dr_id]).exists?
            @output = 4
          end
        end
        if ($zmiana_dok == 1)
             # sprawdź czy istnieje taki numer w nowym typie dok
          if Magazyn.where("numer = ? AND towarzystwo_id = ? AND nazwa_dr_id = ?", @magazyn.numer, params[:towarzystwo_id], params[:nazwa_dr_id]).exists?
             @output = 5
          end
        end
        if @output == 0
          if params[:stan_id].to_i == 6
            if Magazyn.where("numer = ? AND towarzystwo_id = ? AND nazwa_dr_id = ?", @magazyn.numer, params[:towarzystwo_id], params[:nazwa_dr_id]).exists?
              @count = Magazyn.where("numer = ? AND towarzystwo_id = ? AND nazwa_dr_id = ?", @magazyn.numer, params[:towarzystwo_id], params[:nazwa_dr_id])
              if @count.count.to_i > 1
                 #insert
                 @magazyn1 = Magazyn.new
                 @magazyn1.numer = @magazyn.numer
                 @magazyn1.towarzystwo_id = params[:towarzystwo_id]
                 @magazyn1.nazwa_dr_id = params[:nazwa_dr_id]
                 @magazyn1.stan_id = 6
                 @magazyn1.data_wpl = @magazyn.data_wpl
                 @magazyn1.data_zda = Time.now.strftime('%Y-%m-%d')
                 @magazyn1.user_id = current_user.id
                 @magazyn1.save
              elsif @count.count.to_i == 1
                #usun
                  @magazyn.destroy
              else
                @output = 6
              end
            end
          else
            @magazyn1 = Magazyn.new
            @magazyn1.numer = @magazyn.numer
            @magazyn1.towarzystwo_id = params[:towarzystwo_id]
            @magazyn1.nazwa_dr_id = params[:nazwa_dr_id]
            @magazyn1.stan_id = params[:stan_id]
            @magazyn1.data_wpl = @magazyn.data_wpl
            @magazyn1.data_zda = Time.now.strftime('%Y-%m-%d')
            @magazyn1.user_id = current_user.id
            @magazyn1.save
          end
        end
      end
  end
  respond_to do |format|
       format.json {
                    render json: @output
       }
   end
end

def close_platnosc
# jeśli jest z magazynu
  if params[:zmag_dw]
    @count = RatySum.where("polisa_id = ? AND nr_dw = ? AND zmag_dw = 1",session[:polisaid], params[:numer]).count
    if @count.to_i < 2
       Magazyn.where("idpol = ? AND numer = ? AND nazwa_dr_id = 4 AND stan_id = 2 AND towarzystwo_id = ?", session[:polisaid], params[:numer], params[:towarzystwo_id]).first.destroy
    end
  end
#sprawdź czy była z magazynu
 @count = Magazyn.where("idpol = ? AND numer = ? AND nazwa_dr_id = 4 AND towarzystwo_id = ?", session[:polisaid], params[:old_dw], params[:towarzystwo_id]).count
    if @count.to_i > 0 #jeśli 0 to nie z magazyny
     @count = Magazyn.where("idpol = ? AND numer = ? AND nazwa_dr_id = 4 AND towarzystwo_id = ? AND stan_id = 2", session[:polisaid], params[:old_dw], params[:towarzystwo_id]).count
      if @count.to_i == 0
      @m_t = Magazyn.select("data_wpl").where("numer = ? AND towarzystwo_id = ? AND nazwa_dr_id = 4 AND stan_id = 1", params[:old_dw], params[:towarzystwo_id]).first
         @magazyn = Magazyn.new
         @magazyn.numer = params[:old_dw]
         @magazyn.towarzystwo_id = params[:towarzystwo_id]
         @magazyn.nazwa_dr_id = 4
         @magazyn.stan_id = 2
         @magazyn.data_wpl = @m_t.data_wpl
         @magazyn.data_zda = Time.now.strftime('%Y-%m-%d')
         @magazyn.user_id = current_user.id
         @magazyn.idpol = session[:polisaid]
         @magazyn.save
      end
    end
  #if params[:zmag_dw]
  #  @count = Magazyn.where("numer = ? AND idpol = ? AND stan_id = 2 AND nazwa_dr_id = 4", params[:numer], session[:polisaid]).count
  #  if @count.to_i == 1
  #    Magazyn.where("numer = ? AND idpol = ? AND stan_id = 2 AND nazwa_dr_id = 4", params[:numer], session[:polisaid]).first.destroy
  #  end
  #end

   #if Magazyn.where("idpol = ? AND nazwa_dr_id = 4 AND towarzystwo_id = ? AND numer = ?", session[:polisaid], params[:towarzystwo_id], params[:old_dw]).exists?

   #@count = RatySum.where("polisa_id = ? AND nr_dw = ? AND zmag_dw = 1", session[:polisaid], params[:old_dw]).count

   #if @count.to_i < 2
    #  @count = Magazyn.where("numer = ? AND idpol = ? AND stan_id = 2 AND nazwa_dr_id = 4", params[:old_dw], session[:polisaid]).count
    #  if @count.to_i < 1 #brak w magazynie
    #    @m_t = Magazyn.select("data_wpl").where("numer = ? AND towarzystwo_id = ? AND nazwa_dr_id = 4 AND stan_id = 1", params[:old_dw], params[:towarzystwo_id]).first
    #    @magazyn = Magazyn.new
    #    @magazyn.numer = params[:numer]
    #    @magazyn.towarzystwo_id = params[:towarzystwo_id]
    #    @magazyn.nazwa_dr_id = 4
    #    @magazyn.stan_id = 2
    #    @magazyn.data_wpl = @m_t.data_wpl
    #    @magazyn.data_zda = Time.now.strftime('%Y-%m-%d')
    #    @magazyn.user_id = current_user.id
    #    @magazyn.idpol = session[:polisaid]
    #    @magazyn.save
    #  end
   #end

#end
  #if ! params[:old_dw].blank?
  #   @count = RatySum.where("polisa_id = ? AND nr_dw = ?", session[:polisaid], params[:old_dw]).count #spawdź ile było starych

  #   if @count.to_i > 2
  #     if params[:zmag_dw]
  #     if params[:zmag_dw]
  #     if params[:zmag_dw]
  #       @count = RatySum.where("polisa_id = ? AND nr_dw = ?", session[:polisaid], params[:numer]).count #nowy w ilu jest polisach
  #       if @count.to_i < 2
  #         Magazyn.where("idpol = ? AND numer = ? AND towarzystwo_id = ? AND stan_id = 2 AND nazwa_dr_id = 4", session[:polisaid], params[:numer], params[:towarzystwo_id]).first.destroy
  #       end
  #     end
  #   end
  #    if @count.to_i
     #if @count.to_i < 2 #jest 1 lub 0
      #  if params[:zmag_dw] #nowy z mag
      #    @count = RatySum.where("polisa_id = ? AND nr_dw = ?", session[:polisaid], params[:numer]).count #nowy w ilu jest polisach
      #     if @count.to_i < 2
      #       Magazyn.where("idpol = ? AND numer = ? AND towarzystwo_id = ? AND stan_id = 2 AND nazwa_dr_id = 4", session[:polisaid], params[:numer], params[:towarzystwo_id]).first.destroy
      #     end
      #  end
    # else #jest więcej starch
    #   if params[:zmag_dw] #nowy z mag
    #     @count = RatySum.where("polisa_id = ? AND nr_dw = ?", session[:polisaid], params[:numer]).count #nowy w ilu jest polisach
    #      if @count.to_i < 2
    #        Magazyn.where("idpol = ? AND numer = ? AND towarzystwo_id = ? AND stan_id = 2 AND nazwa_dr_id = 4", session[:polisaid], params[:numer], params[:towarzystwo_id]).first.destroy
    #      end
    #   end
     #end

     #if @count.to_i > 1 #stary numer
      #  @count = RatySum.where("polisa_id = ? AND numer = ?", session[:polisaid], params[:numer]).count
      #  if (@count.to_i  == 1)
      #    Magazyn.where("idpol = ? AND numer = ? AND towarzystwo_id = ? AND stan_id = 2 AND nazwa_dr_id = 4", session[:polisaid], params[:numer], params[:towarzystwo_id]).first.destroy
      #  end
     #end
  #else

#  end

#  if params[:zmag].to_i == 1 #jeżeli jest z magazynu
#    @m_t = Magazyn.select("data_wpl").where("numer = ? AND towarzystwo_id = ? AND nazwa_dr_id = 4 AND stan_id = 1", params[:numer], params[:towarzystwo_id]).first
#    @magazyn = Magazyn.new
#    @magazyn.numer = params[:numer]
#    @magazyn.towarzystwo_id = params[:towarzystwo_id]
#    @magazyn.nazwa_dr_id = params[:nazwa_dr_id]
#    @magazyn.stan_id = 2
#    @magazyn.data_wpl = @m_t.data_wpl
#    @magazyn.data_zda = Time.now.strftime('%Y-%m-%d')
#    @magazyn.user_id = current_user.id
#    @magazyn.idpol = session[:polisaid]
#    @magazyn.save
#  end

end


  def history
    @magazyns = Magazyn.find(params[:numer])
  end

  def dodaj
    @ilosc=params[:ilosc]
   @output = 0
   if params[:usun].to_i > 0
        @jest = 0
        for i in 0..@ilosc.to_i
         @numer = params[:ods]+(params[:odn].to_i + i).to_s
         if ViewVmag2.where("numer = ? AND towarzystwo_id = ? AND nazwa_dr_id = ?", @numer, params[:towarzystwo_id], params[:nazwa_dr_id]).exists?
            if ! ViewVmag2.where("numer = ? AND towarzystwo_id = ? AND nazwa_dr_id = ? and stan_id = 1", @numer, params[:towarzystwo_id], params[:nazwa_dr_id]).limit(1).exists?
             @output = 2 #sprawdza czy na magazynie
            end
         else
           @output = 1 #brak rekordu
         end
        end

    if @output == 0
        for i in 0..@ilosc.to_i
            @numer = params[:ods]+(params[:odn].to_i + i).to_s
            dataw = ViewVmag2.where("numer = ? AND towarzystwo_id = ? AND nazwa_dr_id = ?", @numer, params[:towarzystwo_id], params[:nazwa_dr_id]).uniq.pluck(:data_wpl)
            @magazyn = Magazyn.new
            @magazyn.numer = @numer
            @magazyn.towarzystwo_id = params[:towarzystwo_id]
            @magazyn.nazwa_dr_id = params[:nazwa_dr_id]
            @magazyn.stan_id = 6
            @magazyn.data_wpl = Date.parse(dataw.to_s).strftime('%Y-%m-%d')
            @magazyn.data_zda = Time.now.strftime('%Y-%m-%d')
            @magazyn.user_id = current_user.id
            @magazyn.save
        end
    end

   else
      @stan = 0
      if params[:kier].to_i == 1
          @stan = 1
      else
          @stan = 4
      end
      if @stan == 1 #na magazyn
        for i in 0..@ilosc.to_i
           @numer = params[:ods]+(params[:odn].to_i + i).to_s
           if ViewVmag2.where("numer = ? AND towarzystwo_id = ? AND nazwa_dr_id = ?", @numer, params[:towarzystwo_id], params[:nazwa_dr_id]).exists?
              @output = 3 #jest taki dokument
           end
        end
        if @output == 0
          for i in 0..@ilosc.to_i
              @numer = params[:ods]+(params[:odn].to_i + i).to_s
              @magazyn = Magazyn.new
              @magazyn.numer = @numer
              @magazyn.towarzystwo_id = params[:towarzystwo_id]
              @magazyn.nazwa_dr_id = params[:nazwa_dr_id]
              @magazyn.stan_id = 1
              @magazyn.data_wpl = Time.now.strftime('%Y-%m-%d')
              @magazyn.data_zda = Time.now.strftime('%Y-%m-%d')
              @magazyn.user_id = current_user.id
              @magazyn.save
          end
        end
      else # zwrot
        for i in 0..@ilosc.to_i
           @numer = params[:ods]+(params[:odn].to_i + i).to_s
           if ViewVmag2.where("numer = ? AND towarzystwo_id = ? AND nazwa_dr_id = ?", @numer, params[:towarzystwo_id], params[:nazwa_dr_id]).exists?
             if ! ViewVmag2.where("numer = ? AND towarzystwo_id = ? AND nazwa_dr_id = ? and stan_id = 1", @numer, params[:towarzystwo_id], params[:nazwa_dr_id]).limit(1).exists?
              @output = 5 #sprawdza czy na magazynie
             end
           else
              @output = 4 #nie ma takiego dokumentu
           end
        end

        if @output == 0
          for i in 0..@ilosc.to_i
              @numer = params[:ods]+(params[:odn].to_i + i).to_s
              dataw = ViewVmag2.where("numer = ? AND towarzystwo_id = ? AND nazwa_dr_id = ?", @numer, params[:towarzystwo_id], params[:nazwa_dr_id]).uniq.pluck(:data_wpl)
              @magazyn = Magazyn.new
              @magazyn.numer = @numer
              @magazyn.towarzystwo_id = params[:towarzystwo_id]
              @magazyn.nazwa_dr_id = params[:nazwa_dr_id]
              @magazyn.stan_id = 4
              @magazyn.data_wpl = Date.parse(dataw.to_s).strftime('%Y-%m-%d')
              @magazyn.data_zda = Time.now.strftime('%Y-%m-%d')
              @magazyn.user_id = current_user.id
              @magazyn.save
          end
        end
      end
   end
   respond_to do |format|
        format.json {
                     render json: @output
        }
    end
  end

  def szukaj_nr_dok
    @numer=ViewVmag2.select("numer").where("stan_id = 1 AND towarzystwo_id = ? AND nazwa_dr_id =? AND numer like ?", params[:towarzystwo_id], params[:nazwa_dr_id], params[:term]+'%').order(numer: :asc).map { |t|
      { :label => t.numer, :value => t.numer } }
    respond_to do |format|
      format.json {
         render :json => @numer
      }
    end
  end



  private
    # Use callbacks to share common setup or constraints between actions.
    def set_magazyn
      @magazyn = Magazyn.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def magazyn_params
      params.require(:magazyn).permit(:numer, :towarzystwo_id, :nazwa_dr_id, :stan_id, :data_wpl, :data_zda, :user_id, :data_zmiany, :odn, :ilosc, :ods, :kier, :usun, :id_n, :typ)
    end

end
