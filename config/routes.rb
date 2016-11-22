Rails.application.routes.draw do
  #authenticated :user do
  #  root to: 'osobas#index'
  #  match 'active'  => 'sessions#active',  via: :get
  #  match 'timeout' => 'sessions#timeout', via: :get

  #end
  #root to: redirect('/users/sign_in')

  devise_for :users
  authenticated :user do
    root :to => 'osobas#index', :as => :authenticated_root
  end
    root :to => redirect('/users/sign_in')
  resources :pojazds
  resources :towarzystwos
  resources :ryzykas
  resources :nazwy_pols, only: [:create, :new]
  resources :excels, only: [:index]
  resources :oddzials
  post "ryzyka/rysuj_grupy" => "ryzykas#rysuj_grupy"
  get "ryzyka/rysuj_ryzyka" => "ryzykas#rysuj_ryzyka"
  get "ryzyka/tu_ryzyka" => "ryzykas#tu_ryzyka"
  post "ryzyka/szukaj_grupy" => "ryzykas#szukaj_grupy"
  post "ryzyka/szukaj_np" => "ryzykas#szukaj_np"
  get "excel/generuj" => "excels#generuj"
  post "raty_sum/zapisz_raty" => "raty_sums#zapisz_raty"
  post "raty_sum/ilosc_rata" => "raty_sums#ilosc_rata"
  #, only: [:index, :create, :new, :destroy, :update, :edit]

  resources :users, only: [:index, :edit, :destroy, :new, :create, :update]
  resources :agencjes
  post "agencje/rysuj_oddzial" => "agencjes#rysuj_oddzial"
  resources :przypomnienias
  resources :przypomnienia_rats
  resources :administracjas, only: [:index]

  get :send_polisa_mail, to: 'przypomnienias#send_polisa_mail', as: :send_polisa_mail
  get :send_rata_mail, to: 'przypomnienia_rats#send_rata_mail', as: :send_rata_mail


  get "przypomnienia/raport" => "przypomnienias#raport"
  resources :polisa_filtrs, only: [:index]
  #resources :new_polisaids
  resources :marki_pojs, only: [:create, :new]
  resources :model_pojs, only: [:create, :new]
  resources :rodzaj_pojs, only: [:create, :new]
  resources :rodz_pols, only: [:create, :new]
  get "marki_poj/rszukaj_marka" => "marki_pojs#rszukaj_marka"
  get "model_poj/rszukaj_model" => "model_pojs#rszukaj_model"
  get "rodzaj_poj/rszukaj_rodzaj" => "rodzaj_pojs#rszukaj_rodzaj"

  post "marki_poj/szukaj_marka" => "marki_pojs#szukaj_marka"
  post "model_poj/szukaj_model" => "model_pojs#szukaj_model"
  post "rodzaj_poj/szukaj_rodzaj" => "rodzaj_pojs#szukaj_rodzaj"


  resources :raty_sums
  resources :wspolwlas
  resources :ryz_pols
#  match "/update_towarzystwo" => "<polisas>#update_towarzystwo"

get "osoba/szukaj_form" => "osobas#szukaj_form"

get "polisa/szukaj_nr_pol" => "polisas#szukaj_nr_pol"
get "polisa/szukaj_dw" => "polisas#szukaj_dw"
get "polisa/szukaj_certyfikat" => "polisas#szukaj_certyfikat"
get "polisa/szukaj_pl" => "polisas#szukaj_pl"
get "polisa/szukaj_kod_typu_klienta" => "polisas#szukaj_kod_typu_klienta"
get "polisa/szukaj_nr_rej" => "polisas#szukaj_nr_rej"
get "polisa/szukaj_nr_nadwozia" => "polisas#szukaj_nr_nadwozia"

get "polisa/rp_select" => "polisas#rp_select"
get "polisa/nazwy_pol_j" => "polisas#nazwy_pol_j"
get "polisa/t_rodzaj_p2" => "polisas#t_rodzaj_p2"
post "polisa/rysuj_ryz_pol" => "polisas#rysuj_ryz_pol"
post "polisa/rysuj_ws" => "polisas#rysuj_ws"
post "polisa/rysuj_tws" => "polisas#rysuj_tws"
post "polisa/rysuj_wplaty" => "polisas#rysuj_wplaty"
post "polisa/ilosc_rat" => "polisas#ilosc_rat"
post "raty_sum/usun" => "raty_sums#usun"
post "raty_sum/zapisz_json" => "raty_sums#zapisz_json"
post "ryz_pol/zapisz_json" => "ryz_pols#zapisz_json"
post "pojazd/rysuj_pojazd" => "pojazds#rysuj_pojazd"

  resources :polisas
  #resources :polisa#, only:[:edit,:index]
  resources :osobas

get "wspolwla/rszukaj_pesel" => "wspolwlas#rszukaj_pesel"

post "wspolwla/szukaj_pesel" => "wspolwlas#szukaj_pesel"

get "wspolwla/rszukaj_nazwisko" => "wspolwlas#rszukaj_nazwisko"

post "wspolwla/szukaj_nazwisko" => "wspolwlas#szukaj_nazwisko"





get "pojazd/rszukaj_rej" => "pojazds#rszukaj_rej"

post "pojazd/szukaj_rej" => "pojazds#szukaj_rej"

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  #root 'osobas#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
  match '*path', via: :all, to: redirect('/')
end
