# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161210135147) do

  create_table "agencjes", force: :cascade do |t|
    t.string "nazwa",      limit: 100
    t.string "wlasciciel", limit: 100
    t.string "tel",        limit: 50
    t.string "kod",        limit: 6
    t.string "miasto",     limit: 50
    t.string "adres",      limit: 100
    t.string "nazwa_s",    limit: 50
  end

  add_index "agencjes", ["nazwa_s"], name: "index_agencjes_on_nazwa_s", unique: true, using: :btree

  create_table "funkcjes", force: :cascade do |t|
    t.string "nazwa_funkcji", limit: 50
  end

  create_table "magazyns", force: :cascade do |t|
    t.string   "numer",          limit: 30
    t.integer  "towarzystwo_id", limit: 4
    t.integer  "nazwa_dr_id",    limit: 4
    t.integer  "stan_id",        limit: 4
    t.date     "data_wpl"
    t.date     "data_zda"
    t.integer  "user_id",        limit: 4
    t.date     "data_zmiany"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "marki_pojs", force: :cascade do |t|
    t.string "marka", limit: 50, null: false
  end

  add_index "marki_pojs", ["marka"], name: "index_marki_pojs_on_marka", unique: true, using: :btree

  create_table "model_pojs", force: :cascade do |t|
    t.integer "marki_poj_id", limit: 4
    t.string  "model",        limit: 40, null: false
    t.integer "idrodzaju",    limit: 4
    t.string  "typ",          limit: 40
    t.string  "pojemnosc",    limit: 40
    t.string  "ladownosc",    limit: 40
    t.integer "ilosc_miejsc", limit: 2
  end

  create_table "nadwozies", force: :cascade do |t|
    t.string "typ_nadw", limit: 40
  end

  create_table "nazwa_drs", force: :cascade do |t|
    t.string "nazwa", limit: 30
  end

  create_table "nazwy_pols", force: :cascade do |t|
    t.string  "nazwa_polisy", limit: 100
    t.integer "rodz_pol_id",  limit: 4
    t.integer "typ",          limit: 4
  end

  create_table "oddzials", force: :cascade do |t|
    t.string  "miasto",     limit: 100
    t.integer "agencje_id", limit: 4
  end

  create_table "osobas", force: :cascade do |t|
    t.string   "nazwisko",      limit: 100
    t.string   "imie",          limit: 30
    t.string   "kod",           limit: 6
    t.string   "miejscowosc",   limit: 30
    t.string   "ulica",         limit: 40
    t.string   "kod_k",         limit: 6
    t.string   "miejscowosc_k", limit: 30
    t.string   "ulica_k",       limit: 40
    t.string   "tel",           limit: 20
    t.string   "tel_kom",       limit: 20
    t.string   "email",         limit: 30
    t.string   "pesel",         limit: 11
    t.integer  "typ_praw_id",   limit: 4
    t.integer  "rok_ur",        limit: 4
    t.string   "Kat",           limit: 1
    t.datetime "Data_ur"
    t.date     "data_wyd"
    t.text     "uwagi",         limit: 65535
    t.string   "nip",           limit: 15
    t.string   "regon",         limit: 15
    t.integer  "typ_prawny",    limit: 4
    t.string   "n_firmy",       limit: 100
  end

  create_table "paliwos", force: :cascade do |t|
    t.string "rodzaj_paliwa", limit: 40
  end

  create_table "pojazds", force: :cascade do |t|
    t.string  "nr_rej",             limit: 50
    t.integer "marki_poj_id",       limit: 4
    t.integer "model_poj_id",       limit: 4
    t.integer "rodzaj_poj_id",      limit: 4
    t.string  "pojemn",             limit: 10
    t.integer "rok_prod",           limit: 4
    t.string  "nr_nadw",            limit: 60
    t.integer "ilosc_miejsc",       limit: 2
    t.integer "moc",                limit: 4
    t.integer "km",                 limit: 1
    t.integer "kw",                 limit: 1
    t.date    "data_badan_techn"
    t.date    "data_pierwszej_rej"
    t.integer "przebieg",           limit: 4
    t.text    "notatka",            limit: 65535
    t.integer "diesel",             limit: 1
    t.integer "gaz",                limit: 1
    t.integer "paliwo_id",          limit: 4
    t.integer "nadwozie_id",        limit: 4
    t.string  "nr_dow_rej",         limit: 30
    t.string  "miejsce_wydania",    limit: 50
    t.string  "nr_silnika",         limit: 60
    t.string  "kolor",              limit: 20
    t.string  "ladownosc",          limit: 10
    t.string  "masa_calkowita",     limit: 10
    t.date    "data_rej"
    t.string  "karta",              limit: 20
    t.text    "wyp",                limit: 65535
    t.date    "data_wyd_dow"
    t.integer "bezterminowo",       limit: 1
    t.integer "kolor_tab",          limit: 4
    t.string  "wer_wyp",            limit: 30
    t.integer "trans_ile",          limit: 4
  end

  create_table "pol_autos", force: :cascade do |t|
    t.integer "pojazd_id",          limit: 4
    t.integer "polisa_id",          limit: 4
    t.string  "nr_reja",            limit: 15
    t.decimal "suma_ubezpieczenia",            precision: 9, scale: 2
    t.decimal "skladka",                       precision: 9, scale: 2
  end

  create_table "polisas", force: :cascade do |t|
    t.integer "towarzystwo_id",            limit: 4
    t.integer "rodz_pol_id",               limit: 4
    t.string  "numer",                     limit: 50
    t.integer "typ_pol_id",                limit: 4
    t.string  "ozn",                       limit: 50
    t.string  "nr_wniosku",                limit: 50
    t.date    "data_wnios"
    t.string  "ubezpieczony",              limit: 100
    t.date    "pocz_okresu_ubezp"
    t.date    "koniec_okresu_ubezp"
    t.date    "data_wystawienia"
    t.date    "data_wprowadzenia"
    t.date    "data_wznowienia"
    t.boolean "polisa_zwrocona_po_sprzed",               default: false
    t.date    "data_zwrotu_polisy"
    t.boolean "polisa_nie_podlega_wzn",                  default: false
    t.boolean "wystapila_szkoda",                        default: false
    t.integer "zn",                        limit: 3
    t.integer "zw",                        limit: 3
    t.string  "kod_typu_klienta",          limit: 50
    t.string  "kod_rodzaju_polisy",        limit: 50
    t.text    "uwagi_dodatkowe",           limit: 65535
    t.integer "osoba_id",                  limit: 4
    t.string  "certyfikat",                limit: 50
    t.string  "pl",                        limit: 50
    t.string  "zk",                        limit: 50
    t.string  "miejsce_ub",                limit: 50
    t.boolean "przypominac",                             default: false
    t.integer "user_id",                   limit: 4
    t.boolean "zmag_n",                                  default: false
    t.boolean "zmag_c",                                  default: false
    t.boolean "zmag_zk",                                 default: false
    t.boolean "zmag_ktk",                                default: false
    t.integer "agencje_id",                limit: 4
    t.string  "wprowadzil",                limit: 60
    t.integer "rodzaj_polisy",             limit: 4
    t.integer "typ_platnosci_id",          limit: 4
    t.integer "oddzial_id",                limit: 4
  end

  create_table "raty_sums", force: :cascade do |t|
    t.integer "polisa_id",           limit: 4
    t.decimal "kwota",                          precision: 9, scale: 2
    t.date    "data"
    t.boolean "zapl",                                                   default: false
    t.integer "rodzaj_platnosci_id", limit: 4
    t.string  "nr_dw",               limit: 20
    t.integer "nr_raty",             limit: 4
    t.integer "nazwy_pol_id",        limit: 4
    t.decimal "prow_proc",                      precision: 9, scale: 2
    t.decimal "prow_kwota",                     precision: 9, scale: 2
    t.decimal "prow_ag_proc",                   precision: 9, scale: 2
    t.decimal "prow_ag_kwota",                  precision: 9, scale: 2
    t.decimal "prow_otrzymana",                 precision: 9, scale: 2
    t.string  "uwagi",               limit: 50
    t.date    "data_w"
    t.boolean "prow_dowolna",                                           default: false
    t.decimal "odsetki",                        precision: 9, scale: 2
    t.integer "id_agent",            limit: 4
    t.boolean "rozliczona",                                             default: false
    t.boolean "roz_owca",                                               default: false
    t.string  "nr_wyk",              limit: 15
    t.date    "data_roz"
    t.decimal "kwota_owca",                     precision: 9, scale: 2
    t.string  "kom",                 limit: 30
    t.boolean "przypominac",                                            default: false
    t.integer "typ_platnosci_id",    limit: 4
  end

  create_table "rodz_pols", force: :cascade do |t|
    t.string  "nazwa_rodz",     limit: 50
    t.integer "towarzystwo_id", limit: 4
    t.integer "typ",            limit: 4
  end

  create_table "rodzaj_platnoscis", force: :cascade do |t|
    t.string "typ", limit: 10
  end

  create_table "rodzaj_pojs", force: :cascade do |t|
    t.string "rodzaj", limit: 50, null: false
  end

  create_table "ryz_pols", force: :cascade do |t|
    t.integer "nazwy_pol_id", limit: 4
    t.integer "polisa_id",    limit: 4
    t.decimal "suma_ubezp",                 precision: 12, scale: 2
    t.decimal "stawka",                     precision: 8,  scale: 2
    t.text    "uwagi",        limit: 65535
    t.string  "waluta",       limit: 4
    t.string  "kod_taryfy",   limit: 25
    t.decimal "przypis",                    precision: 8,  scale: 2
    t.integer "ilosc",        limit: 4
  end

  create_table "stans", force: :cascade do |t|
    t.string "stan", limit: 30
  end

  create_table "towarzystwos", force: :cascade do |t|
    t.string "nazwa",     limit: 30
    t.string "ulica",     limit: 40
    t.string "kod",       limit: 6
    t.string "miasto",    limit: 40
    t.string "bank",      limit: 50
    t.string "oddzial",   limit: 50
    t.string "nr_konta",  limit: 50
    t.string "nazwa_max", limit: 100
    t.string "email1",    limit: 100
    t.string "email2",    limit: 100
    t.string "tel",       limit: 100
    t.string "fax",       limit: 100
    t.string "tel_ass",   limit: 100
    t.string "tel_szk",   limit: 100
  end

  create_table "typ_platnoscis", force: :cascade do |t|
    t.string "nazwa_typu", limit: 20
  end

  create_table "typ_pols", force: :cascade do |t|
    t.string "nazwa_typu", limit: 20
  end

  create_table "typ_praws", force: :cascade do |t|
    t.string "rodzaj", limit: 10
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  limit: 255, default: "", null: false
    t.string   "encrypted_password",     limit: 255, default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,   default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
    t.string   "nazwa",                  limit: 100
    t.integer  "funkcje_id",             limit: 4
    t.integer  "agencje_id",             limit: 4
    t.string   "loginn",                 limit: 100
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["loginn"], name: "index_users_on_loginn", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "view_excels", id: false, force: :cascade do |t|
    t.integer "id",               limit: 4,                              default: 0, null: false
    t.string  "numer",            limit: 50
    t.string  "ubezpieczony",     limit: 100
    t.string  "nazwa",            limit: 30
    t.string  "certyfikat",       limit: 50
    t.string  "zk",               limit: 50
    t.date    "data_wystawienia"
    t.string  "pl",               limit: 50
    t.text    "np",               limit: 65535
    t.decimal "k",                              precision: 31, scale: 2
    t.decimal "kwota",                          precision: 31, scale: 2
    t.string  "nr_dw",            limit: 20
    t.integer "typ_platnosci_id", limit: 4
    t.integer "oddzial_id",       limit: 4
  end

  create_table "view_nazwy_ryzyks", id: false, force: :cascade do |t|
    t.integer "polisa_id",    limit: 4
    t.string  "nazwa_polisy", limit: 100
  end

  create_table "view_npgs", id: false, force: :cascade do |t|
    t.integer "polisa_id", limit: 4
    t.text    "np",        limit: 65535
  end

  create_table "view_nr_dws", id: false, force: :cascade do |t|
    t.integer "polisa_id", limit: 4
    t.string  "nr_dw",     limit: 20
  end

  create_table "view_nrraty1s", id: false, force: :cascade do |t|
    t.integer "polisa_id", limit: 4
    t.decimal "kwota",               precision: 31, scale: 2
  end

  create_table "view_osobas", id: false, force: :cascade do |t|
    t.integer "id",           limit: 4,     default: 0, null: false
    t.string  "ubezpieczony", limit: 232
    t.string  "miejscowosc",  limit: 30
    t.string  "ulica",        limit: 40
    t.string  "tel",          limit: 20
    t.string  "pesel",        limit: 11
    t.text    "uwagi",        limit: 65535
  end

  create_table "view_przypis", id: false, force: :cascade do |t|
    t.integer "polisa_id", limit: 4
    t.decimal "k",                   precision: 31, scale: 2
  end

  create_table "view_rats", id: false, force: :cascade do |t|
    t.integer "id",               limit: 4,                           default: 0,     null: false
    t.integer "polisa_id",        limit: 4
    t.string  "nazwa",            limit: 30
    t.string  "nr_dw",            limit: 20
    t.integer "nr_raty",          limit: 4
    t.decimal "kwota",                        precision: 9, scale: 2
    t.date    "data_w"
    t.integer "typ_platnosci_id", limit: 4
    t.boolean "zapl",                                                 default: false
    t.integer "oddzial_id",       limit: 4
    t.string  "numer",            limit: 50
    t.string  "ubezpieczony",     limit: 100
  end

  create_table "wspolwlas", force: :cascade do |t|
    t.integer "polisa_id",   limit: 4
    t.string  "nazwisko",    limit: 30
    t.string  "imie",        limit: 30
    t.string  "kod",         limit: 6
    t.string  "miejscowosc", limit: 30
    t.string  "ulica",       limit: 50
    t.string  "pesel",       limit: 14
    t.date    "data_praw"
    t.integer "typ_praw_id", limit: 4
    t.text    "uwagi",       limit: 65535
  end

end
