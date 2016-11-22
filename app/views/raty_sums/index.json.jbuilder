json.array!(@raty_sumies) do |raty_sumy|
  json.extract! raty_sumy, :id, :polisa_is, :kwota, :data, :zapl, :forma, :nr_dw, :nr_raty, :id_ryz, :prow_proc, :prow_kwota, :prow_ag_proc, :prow_ag_kwota, :prow_otrzymana, :uwagi, :data_w, :prow_dowolna, :odsetki, :id_agent, :rozliczona, :roz_owca, :nr_wyk, :data_roz, :kwota_owca
  json.url raty_sumy_url(raty_sumy, format: :json)
end
