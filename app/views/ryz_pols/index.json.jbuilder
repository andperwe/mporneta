json.array!(@ryz_pols) do |ryz_pol|
  json.extract! ryz_pol, :id, :idryz, :idpol,  :suma_ubezp, :stawka, :uwagi, :waluta, :kod_taryfy, :przypis, :ilosc
  json.url ryz_pol_url(ryz_pol, format: :json)
end
