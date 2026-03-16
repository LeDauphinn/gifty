export interface RetailerDefinition {
  name: string;
  searchUrl: string;
}

export interface CountryRetailerConfig {
  code: string;
  name: string;
  searchLanguage: string;
  retailers: RetailerDefinition[];
}

const retailer = (name: string, searchUrl: string): RetailerDefinition => ({ name, searchUrl });

const country = (
  code: string,
  name: string,
  searchLanguage: string,
  retailers: RetailerDefinition[]
): CountryRetailerConfig => ({
  code,
  name,
  searchLanguage,
  retailers
});

export const DEFAULT_COUNTRY_CODE = 'US';

export const COUNTRY_RETAILER_CATALOG: CountryRetailerConfig[] = [
  // Americas
  country('US', 'United States', 'English', [
    retailer('Amazon', 'https://www.amazon.com/s?k={query}'),
    retailer('Walmart', 'https://www.walmart.com/search?q={query}'),
    retailer('Target', 'https://www.target.com/s?searchTerm={query}'),
    retailer('Etsy', 'https://www.etsy.com/search?q={query}')
  ]),
  country('CA', 'Canada', 'English', [
    retailer('Amazon CA', 'https://www.amazon.ca/s?k={query}'),
    retailer('Walmart CA', 'https://www.walmart.ca/search?q={query}'),
    retailer('Best Buy CA', 'https://www.bestbuy.ca/en-ca/search?search={query}'),
    retailer('Etsy', 'https://www.etsy.com/ca/search?q={query}')
  ]),
  country('MX', 'Mexico', 'Spanish', [
    retailer('Amazon MX', 'https://www.amazon.com.mx/s?k={query}'),
    retailer('Mercado Libre', 'https://listado.mercadolibre.com.mx/{query}'),
    retailer('Liverpool', 'https://www.liverpool.com.mx/tienda?s={query}'),
    retailer('Coppel', 'https://www.coppel.com/search?text={query}')
  ]),
  country('BR', 'Brazil', 'Portuguese', [
    retailer('Amazon BR', 'https://www.amazon.com.br/s?k={query}'),
    retailer('Mercado Livre', 'https://lista.mercadolivre.com.br/{query}'),
    retailer('Magalu', 'https://www.magazineluiza.com.br/busca/{query}/'),
    retailer('Shopee BR', 'https://shopee.com.br/search?keyword={query}')
  ]),
  country('AR', 'Argentina', 'Spanish', [
    retailer('Mercado Libre', 'https://listado.mercadolibre.com.ar/{query}'),
    retailer('Fravega', 'https://www.fravega.com/l/?keyword={query}'),
    retailer('Musimundo', 'https://www.musimundo.com/search/?text={query}'),
    retailer('Cetrogar', 'https://www.cetrogar.com.ar/catalogsearch/result/?q={query}')
  ]),
  country('CL', 'Chile', 'Spanish', [
    retailer('Mercado Libre', 'https://listado.mercadolibre.cl/{query}'),
    retailer('Falabella', 'https://www.falabella.com/falabella-cl/search?Ntt={query}'),
    retailer('Paris', 'https://www.paris.cl/search?cgid=root&srule=best-matches&q={query}'),
    retailer('Ripley', 'https://simple.ripley.cl/search/{query}')
  ]),
  country('CO', 'Colombia', 'Spanish', [
    retailer('Mercado Libre', 'https://listado.mercadolibre.com.co/{query}'),
    retailer('Falabella', 'https://www.falabella.com.co/falabella-co/search?Ntt={query}'),
    retailer('Exito', 'https://www.exito.com/search?query={query}'),
    retailer('Linio', 'https://www.linio.com.co/search?scroll=&q={query}')
  ]),
  country('PE', 'Peru', 'Spanish', [
    retailer('Mercado Libre', 'https://listado.mercadolibre.com.pe/{query}'),
    retailer('Falabella', 'https://www.falabella.com.pe/falabella-pe/search?Ntt={query}'),
    retailer('Ripley', 'https://simple.ripley.com.pe/search/{query}'),
    retailer('Oechsle', 'https://www.oechsle.pe/catalogsearch/result/?q={query}')
  ]),
  country('VE', 'Venezuela', 'Spanish', [
    retailer('Mercado Libre', 'https://listado.mercadolibre.com.ve/{query}'),
    retailer('Ivoo', 'https://www.ivoo.com/search?controller=search&s={query}'),
    retailer('Daka', 'https://www.daka.com.ve/catalogsearch/result/?q={query}'),
    retailer('Traki', 'https://traki.com/catalogsearch/result/?q={query}')
  ]),
  country('EC', 'Ecuador', 'Spanish', [
    retailer('Mercado Libre', 'https://listado.mercadolibre.com.ec/{query}'),
    retailer('De Prati', 'https://www.deprati.com.ec/catalogsearch/result/?q={query}'),
    retailer('Etafashion', 'https://www.etafashion.com/catalogsearch/result/?q={query}'),
    retailer('Sukasa', 'https://www.sukasa.com/catalogsearch/result/?q={query}')
  ]),
  country('UY', 'Uruguay', 'Spanish', [
    retailer('Mercado Libre', 'https://listado.mercadolibre.com.uy/{query}'),
    retailer('Tienda Inglesa', 'https://www.tiendainglesa.com.uy/supermercado/search?query={query}'),
    retailer('WoOw', 'https://woow.com.uy/busqueda?text={query}'),
    retailer('MundoMac', 'https://www.mundomac.com.uy/search?type=product&q={query}')
  ]),
  country('PY', 'Paraguay', 'Spanish', [
    retailer('Mercado Libre', 'https://listado.mercadolibre.com.py/{query}'),
    retailer('Nissei', 'https://nissei.com/py/busqueda?controller=search&s={query}'),
    retailer('Shopping China', 'https://www.shoppingchina.com.py/search?query={query}'),
    retailer('Monalisa', 'https://www.monalisa.com.py/search?q={query}')
  ]),
  country('BO', 'Bolivia', 'Spanish', [
    retailer('Mercado Libre', 'https://listado.mercadolibre.com.bo/{query}'),
    retailer('Multicenter', 'https://www.multicenter.com.bo/catalogsearch/result/?q={query}'),
    retailer('Shopping China', 'https://www.shoppingchina.com.py/search?query={query}'),
    retailer('AliExpress', 'https://www.aliexpress.com/wholesale?SearchText={query}')
  ]),
  country('CR', 'Costa Rica', 'Spanish', [
    retailer('Amazon', 'https://www.amazon.com/s?k={query}'),
    retailer('Walmart CR', 'https://www.walmart.co.cr/search?q={query}'),
    retailer('Unimart', 'https://unimart.com/search?q={query}'),
    retailer('Siman', 'https://www.siman.com/costarica/search?text={query}')
  ]),
  country('PA', 'Panama', 'Spanish', [
    retailer('Amazon', 'https://www.amazon.com/s?k={query}'),
    retailer('Panafoto', 'https://www.panafoto.com/catalogsearch/result/?q={query}'),
    retailer('Multimax', 'https://www.multimax.net/search?q={query}'),
    retailer('Stevens', 'https://www.stevens.com.pa/catalogsearch/result/?q={query}')
  ]),
  country('DO', 'Dominican Republic', 'Spanish', [
    retailer('Amazon', 'https://www.amazon.com/s?k={query}'),
    retailer('La Sirena', 'https://sirena.do/catalogsearch/result/?q={query}'),
    retailer('Jumbo', 'https://www.jumbo.com.do/catalogsearch/result/?q={query}'),
    retailer('Plaza Lama', 'https://plazalama.com.do/catalogsearch/result/?q={query}')
  ]),
  country('GT', 'Guatemala', 'Spanish', [
    retailer('Amazon', 'https://www.amazon.com/s?k={query}'),
    retailer('Cemaco', 'https://www.cemaco.com/catalogsearch/result/?q={query}'),
    retailer('Sears GT', 'https://sears.com.gt/catalogsearch/result/?q={query}'),
    retailer('Siman', 'https://www.siman.com/guatemala/search?text={query}')
  ]),
  country('SV', 'El Salvador', 'Spanish', [
    retailer('Amazon', 'https://www.amazon.com/s?k={query}'),
    retailer('Siman', 'https://www.siman.com/el-salvador/search?text={query}'),
    retailer('Walmart SV', 'https://www.walmart.com.sv/search?q={query}'),
    retailer('La Curacao', 'https://www.lacuracao.com.sv/catalogsearch/result/?q={query}')
  ]),
  country('HN', 'Honduras', 'Spanish', [
    retailer('Amazon', 'https://www.amazon.com/s?k={query}'),
    retailer('Diunsa', 'https://www.diunsa.hn/catalogsearch/result/?q={query}'),
    retailer('Jetstereo', 'https://jetstereo.com/search?type=product&q={query}'),
    retailer('Walmart HN', 'https://www.walmart.com.hn/search?q={query}')
  ]),
  country('NI', 'Nicaragua', 'Spanish', [
    retailer('Amazon', 'https://www.amazon.com/s?k={query}'),
    retailer('Walmart NI', 'https://www.walmart.com.ni/search?q={query}'),
    retailer('La Curacao', 'https://www.lacuracaonline.com/nicaragua/catalogsearch/result/?q={query}'),
    retailer('Siman', 'https://www.siman.com/nicaragua/search?text={query}')
  ]),

  // Europe
  country('GB', 'United Kingdom', 'English', [
    retailer('Amazon UK', 'https://www.amazon.co.uk/s?k={query}'),
    retailer('John Lewis', 'https://www.johnlewis.com/search?search-term={query}'),
    retailer('Argos', 'https://www.argos.co.uk/search/{query}/'),
    retailer('Etsy', 'https://www.etsy.com/uk/search?q={query}')
  ]),
  country('IE', 'Ireland', 'English', [
    retailer('Amazon UK', 'https://www.amazon.co.uk/s?k={query}'),
    retailer('Harvey Norman', 'https://www.harveynorman.ie/index.php?subcats=Y&status=A&pshort=Y&pfull=Y&pname=Y&pkeywords=Y&search_performed=Y&q={query}'),
    retailer('Brown Thomas', 'https://www.brownthomas.com/search?q={query}'),
    retailer('Etsy', 'https://www.etsy.com/ie/search?q={query}')
  ]),
  country('FR', 'France', 'French', [
    retailer('Amazon FR', 'https://www.amazon.fr/s?k={query}'),
    retailer('Cdiscount', 'https://www.cdiscount.com/search/10/{query}.html'),
    retailer('Fnac', 'https://www.fnac.com/SearchResult/ResultList.aspx?Search={query}'),
    retailer('La Redoute', 'https://www.laredoute.fr/ppdp/prod-search.aspx?kwrd={query}')
  ]),
  country('DE', 'Germany', 'German', [
    retailer('Amazon DE', 'https://www.amazon.de/s?k={query}'),
    retailer('Otto', 'https://www.otto.de/suche/{query}/'),
    retailer('Zalando', 'https://www.zalando.de/katalog/?q={query}'),
    retailer('MediaMarkt', 'https://www.mediamarkt.de/de/search.html?query={query}')
  ]),
  country('ES', 'Spain', 'Spanish', [
    retailer('Amazon ES', 'https://www.amazon.es/s?k={query}'),
    retailer('El Corte Ingles', 'https://www.elcorteingles.es/search/?s={query}'),
    retailer('Fnac ES', 'https://www.fnac.es/SearchResult/ResultList.aspx?Search={query}'),
    retailer('PcComponentes', 'https://www.pccomponentes.com/buscar/?query={query}')
  ]),
  country('IT', 'Italy', 'Italian', [
    retailer('Amazon IT', 'https://www.amazon.it/s?k={query}'),
    retailer('Unieuro', 'https://www.unieuro.it/online/cerca?text={query}'),
    retailer('IBS', 'https://www.ibs.it/search/?ts={query}'),
    retailer('Etsy', 'https://www.etsy.com/it/search?q={query}')
  ]),
  country('NL', 'Netherlands', 'Dutch', [
    retailer('bol', 'https://www.bol.com/nl/nl/s/?searchtext={query}'),
    retailer('Amazon NL', 'https://www.amazon.nl/s?k={query}'),
    retailer('Coolblue', 'https://www.coolblue.nl/en/search?query={query}'),
    retailer('Etsy', 'https://www.etsy.com/nl/search?q={query}')
  ]),
  country('BE', 'Belgium', 'French', [
    retailer('bol', 'https://www.bol.com/be/nl/s/?searchtext={query}'),
    retailer('Amazon BE', 'https://www.amazon.com.be/s?k={query}'),
    retailer('Coolblue', 'https://www.coolblue.be/en/search?query={query}'),
    retailer('Fnac', 'https://www.fr.fnac.be/SearchResult/ResultList.aspx?Search={query}')
  ]),
  country('PT', 'Portugal', 'Portuguese', [
    retailer('Worten', 'https://www.worten.pt/search?query={query}'),
    retailer('Fnac PT', 'https://www.fnac.pt/SearchResult/ResultList.aspx?Search={query}'),
    retailer('Amazon ES', 'https://www.amazon.es/s?k={query}'),
    retailer('El Corte Ingles', 'https://www.elcorteingles.pt/search-nwx/1/?s={query}')
  ]),
  country('CH', 'Switzerland', 'German', [
    retailer('Digitec Galaxus', 'https://www.galaxus.ch/en/search?q={query}'),
    retailer('Manor', 'https://www.manor.ch/en/search?query={query}'),
    retailer('BRACK', 'https://www.brack.ch/en/search?query={query}'),
    retailer('Amazon DE', 'https://www.amazon.de/s?k={query}')
  ]),
  country('AT', 'Austria', 'German', [
    retailer('Amazon DE', 'https://www.amazon.de/s?k={query}'),
    retailer('OTTO', 'https://www.ottoversand.at/suche/{query}/'),
    retailer('Zalando', 'https://www.zalando.at/katalog/?q={query}'),
    retailer('MediaMarkt', 'https://www.mediamarkt.at/de/search.html?query={query}')
  ]),
  country('SE', 'Sweden', 'Swedish', [
    retailer('Amazon SE', 'https://www.amazon.se/s?k={query}'),
    retailer('CDON', 'https://cdon.se/search?q={query}'),
    retailer('Elgiganten', 'https://www.elgiganten.se/search?query={query}'),
    retailer('Boozt', 'https://www.boozt.com/se/sv/search?q={query}')
  ]),
  country('NO', 'Norway', 'Norwegian', [
    retailer('Elkjop', 'https://www.elkjop.no/search/{query}'),
    retailer('Komplett', 'https://www.komplett.no/search?q={query}'),
    retailer('CDON', 'https://cdon.no/search?q={query}'),
    retailer('Boozt', 'https://www.boozt.com/no/no/search?q={query}')
  ]),
  country('DK', 'Denmark', 'Danish', [
    retailer('Elgiganten', 'https://www.elgiganten.dk/search?query={query}'),
    retailer('Proshop', 'https://www.proshop.dk/?s={query}'),
    retailer('Boozt', 'https://www.boozt.com/dk/da/search?q={query}'),
    retailer('Amazon DE', 'https://www.amazon.de/s?k={query}')
  ]),
  country('FI', 'Finland', 'Finnish', [
    retailer('Verkkokauppa', 'https://www.verkkokauppa.com/fi/search?query={query}'),
    retailer('Gigantti', 'https://www.gigantti.fi/search?query={query}'),
    retailer('Stockmann', 'https://www.stockmann.com/search?text={query}'),
    retailer('Amazon DE', 'https://www.amazon.de/s?k={query}')
  ]),
  country('PL', 'Poland', 'Polish', [
    retailer('Allegro', 'https://allegro.pl/listing?string={query}'),
    retailer('Empik', 'https://www.empik.com/szukaj/produkt?q={query}'),
    retailer('Media Expert', 'https://www.mediaexpert.pl/search?query%5Bmenu_item%5D=&query%5Bquerystring%5D={query}'),
    retailer('Amazon PL', 'https://www.amazon.pl/s?k={query}')
  ]),
  country('CZ', 'Czech Republic', 'Czech', [
    retailer('Alza', 'https://www.alza.cz/search.htm?exps={query}'),
    retailer('Mall', 'https://www.mall.cz/hledani?query={query}'),
    retailer('Notino', 'https://www.notino.cz/search.asp?exps={query}'),
    retailer('Amazon DE', 'https://www.amazon.de/s?k={query}')
  ]),
  country('SK', 'Slovakia', 'Slovak', [
    retailer('Alza', 'https://www.alza.sk/search.htm?exps={query}'),
    retailer('Mall', 'https://www.mall.sk/hladanie?query={query}'),
    retailer('Notino', 'https://www.notino.sk/search.asp?exps={query}'),
    retailer('Amazon DE', 'https://www.amazon.de/s?k={query}')
  ]),
  country('HU', 'Hungary', 'Hungarian', [
    retailer('eMAG', 'https://www.emag.hu/search/{query}'),
    retailer('Alza', 'https://www.alza.hu/kereses.htm?exps={query}'),
    retailer('MediaMarkt', 'https://www.mediamarkt.hu/hu/search.html?query={query}'),
    retailer('MALL', 'https://www.mall.hu/kereses?query={query}')
  ]),
  country('RO', 'Romania', 'Romanian', [
    retailer('eMAG', 'https://www.emag.ro/search/{query}'),
    retailer('Fashion Days', 'https://www.fashiondays.ro/catalog/?q={query}'),
    retailer('Elefant', 'https://www.elefant.ro/search?SearchTerm={query}'),
    retailer('Altex', 'https://altex.ro/cauta/?q={query}')
  ]),
  country('BG', 'Bulgaria', 'Bulgarian', [
    retailer('eMAG', 'https://www.emag.bg/search/{query}'),
    retailer('Ozone', 'https://www.ozone.bg/search/?text={query}'),
    retailer('Technopolis', 'https://www.technopolis.bg/bg/search?query={query}'),
    retailer('About You', 'https://www.aboutyou.bg/search?term={query}')
  ]),
  country('GR', 'Greece', 'Greek', [
    retailer('Skroutz', 'https://www.skroutz.gr/search?keyphrase={query}'),
    retailer('Public', 'https://www.public.gr/search/{query}/'),
    retailer('Plaisio', 'https://www.plaisio.gr/search?query={query}'),
    retailer('e-shop', 'https://www.e-shop.gr/search?q={query}')
  ]),
  country('TR', 'Turkey', 'Turkish', [
    retailer('Trendyol', 'https://www.trendyol.com/sr?q={query}'),
    retailer('Hepsiburada', 'https://www.hepsiburada.com/ara?q={query}'),
    retailer('Ciceksepeti', 'https://www.ciceksepeti.com/arama?query={query}'),
    retailer('Amazon TR', 'https://www.amazon.com.tr/s?k={query}')
  ]),
  country('UA', 'Ukraine', 'Ukrainian', [
    retailer('Rozetka', 'https://rozetka.com.ua/search/?text={query}'),
    retailer('Epicentr', 'https://epicentrk.ua/ua/search/?q={query}'),
    retailer('Allo', 'https://allo.ua/ua/catalogsearch/result/?q={query}'),
    retailer('Prom', 'https://prom.ua/ua/search?search_term={query}')
  ]),
  country('RU', 'Russia', 'Russian', [
    retailer('Ozon', 'https://www.ozon.ru/search/?text={query}'),
    retailer('Wildberries', 'https://www.wildberries.ru/catalog/0/search.aspx?search={query}'),
    retailer('Yandex Market', 'https://market.yandex.ru/search?text={query}'),
    retailer('AliExpress RU', 'https://aliexpress.ru/wholesale?SearchText={query}')
  ]),
  country('HR', 'Croatia', 'Croatian', [
    retailer('Mall', 'https://www.mall.hr/search?query={query}'),
    retailer('Emmezeta', 'https://www.emmezeta.hr/catalogsearch/result/?q={query}'),
    retailer('Sancta Domenica', 'https://www.sancta-domenica.hr/search/?text={query}'),
    retailer('About You', 'https://www.aboutyou.hr/search?term={query}')
  ]),
  country('SI', 'Slovenia', 'Slovenian', [
    retailer('Mimovrste', 'https://www.mimovrste.com/iskanje?s={query}'),
    retailer('Big Bang', 'https://www.bigbang.si/search?search_query={query}'),
    retailer('About You', 'https://www.aboutyou.si/search?term={query}'),
    retailer('Amazon DE', 'https://www.amazon.de/s?k={query}')
  ]),
  country('RS', 'Serbia', 'Serbian', [
    retailer('Ananas', 'https://ananas.rs/search?text={query}'),
    retailer('Gigatron', 'https://gigatron.rs/pretraga?keywords={query}'),
    retailer('Tehnomanija', 'https://www.tehnomanija.rs/pretraga?search={query}'),
    retailer('Fashion & Friends', 'https://fashionandfriends.com/rs/search?term={query}')
  ]),
  country('LT', 'Lithuania', 'Lithuanian', [
    retailer('Pigu', 'https://pigu.lt/lt/search?q={query}'),
    retailer('Varle', 'https://www.varle.lt/search/?q={query}'),
    retailer('Senukai', 'https://www.senukai.lt/search?query={query}'),
    retailer('1A', 'https://www.1a.lt/search?query={query}')
  ]),
  country('LV', 'Latvia', 'Latvian', [
    retailer('220.lv', 'https://220.lv/lv/search?q={query}'),
    retailer('1A', 'https://www.1a.lv/search?query={query}'),
    retailer('RD Electronics', 'https://www.rdveikals.lv/search/lv/word/{query}'),
    retailer('Amazon DE', 'https://www.amazon.de/s?k={query}')
  ]),
  country('EE', 'Estonia', 'Estonian', [
    retailer('Kaup24', 'https://kaup24.ee/et/search?q={query}'),
    retailer('Hansapost', 'https://hansapost.ee/et/search?q={query}'),
    retailer('Euronics', 'https://www.euronics.ee/en/search?q={query}'),
    retailer('Amazon DE', 'https://www.amazon.de/s?k={query}')
  ]),

  // Asia, Middle East, and Africa
  country('IN', 'India', 'English', [
    retailer('Amazon IN', 'https://www.amazon.in/s?k={query}'),
    retailer('Flipkart', 'https://www.flipkart.com/search?q={query}'),
    retailer('Myntra', 'https://www.myntra.com/{query}'),
    retailer('FirstCry', 'https://www.firstcry.com/search?query={query}')
  ]),
  country('PK', 'Pakistan', 'English', [
    retailer('Daraz', 'https://www.daraz.pk/catalog/?q={query}'),
    retailer('iShopping', 'https://www.ishopping.pk/catalogsearch/result/?q={query}'),
    retailer('Telemart', 'https://www.telemart.pk/catalogsearch/result/?q={query}'),
    retailer('Naheed', 'https://www.naheed.pk/catalogsearch/result/?q={query}')
  ]),
  country('BD', 'Bangladesh', 'English', [
    retailer('Daraz', 'https://www.daraz.com.bd/catalog/?q={query}'),
    retailer('Pickaboo', 'https://www.pickaboo.com/search?search={query}'),
    retailer('AjkerDeal', 'https://ajkerdeal.com/search?query={query}'),
    retailer('Chaldal', 'https://chaldal.com/search/{query}')
  ]),
  country('LK', 'Sri Lanka', 'English', [
    retailer('Daraz', 'https://www.daraz.lk/catalog/?q={query}'),
    retailer('Kapruka', 'https://www.kapruka.com/shops/search.jsp?query={query}'),
    retailer('Wasi', 'https://wasi.lk/search?q={query}'),
    retailer('Takas', 'https://www.takas.lk/search?type=product&q={query}')
  ]),
  country('NP', 'Nepal', 'English', [
    retailer('Daraz', 'https://www.daraz.com.np/catalog/?q={query}'),
    retailer('SastoDeal', 'https://www.sastodeal.com/catalogsearch/result/?q={query}'),
    retailer('Gyapu', 'https://gyapu.com/search?keyword={query}'),
    retailer('Hukut', 'https://www.hukut.com/search?query={query}')
  ]),
  country('AE', 'United Arab Emirates', 'Arabic', [
    retailer('Amazon AE', 'https://www.amazon.ae/s?k={query}'),
    retailer('Noon', 'https://www.noon.com/uae-en/search/?q={query}'),
    retailer('Namshi', 'https://en-ae.namshi.com/catalogsearch/result/?q={query}'),
    retailer('Sharaf DG', 'https://uae.sharafdg.com/search/{query}/')
  ]),
  country('SA', 'Saudi Arabia', 'Arabic', [
    retailer('Amazon SA', 'https://www.amazon.sa/s?k={query}'),
    retailer('Noon', 'https://www.noon.com/saudi-en/search/?q={query}'),
    retailer('Jarir', 'https://www.jarir.com/sa-en/catalogsearch/result/?q={query}'),
    retailer('Extra', 'https://www.extra.com/en-sa/search/?text={query}')
  ]),
  country('QA', 'Qatar', 'Arabic', [
    retailer('Noon', 'https://www.noon.com/uae-en/search/?q={query}'),
    retailer('Lulu Hypermarket', 'https://www.luluhypermarket.com/en-qa/search?text={query}'),
    retailer('Jarir Qatar', 'https://www.jarir.com/qa-en/catalogsearch/result/?q={query}'),
    retailer('Virgin Megastore', 'https://www.virginmegastore.qa/en/search/?text={query}')
  ]),
  country('KW', 'Kuwait', 'Arabic', [
    retailer('Xcite', 'https://www.xcite.com/search/?q={query}'),
    retailer('Boutiqaat', 'https://www.boutiqaat.com/en-kw/search?text={query}'),
    retailer('Amazon AE', 'https://www.amazon.ae/s?k={query}'),
    retailer('Taw9eel', 'https://www.taw9eel.com/en/search?q={query}')
  ]),
  country('OM', 'Oman', 'Arabic', [
    retailer('Lulu Hypermarket', 'https://www.luluhypermarket.com/en-om/search?text={query}'),
    retailer('Sharaf DG', 'https://oman.sharafdg.com/search/{query}/'),
    retailer('Amazon AE', 'https://www.amazon.ae/s?k={query}'),
    retailer('Noon', 'https://www.noon.com/uae-en/search/?q={query}')
  ]),
  country('IL', 'Israel', 'Hebrew', [
    retailer('KSP', 'https://ksp.co.il/web/search?search={query}'),
    retailer('Ivory', 'https://www.ivory.co.il/catalog.php?act=cat&q={query}'),
    retailer('Azrieli', 'https://www.azrieli.com/search?query={query}'),
    retailer('Amazon', 'https://www.amazon.com/s?k={query}')
  ]),
  country('JO', 'Jordan', 'Arabic', [
    retailer('Amazon AE', 'https://www.amazon.ae/s?k={query}'),
    retailer('Virgin Megastore', 'https://www.virginmegastore.jo/en/search/?text={query}'),
    retailer('DNA Stores', 'https://www.dna.jo/search?query={query}'),
    retailer('Lulu Hypermarket', 'https://www.luluhypermarket.com/en-jo/search?text={query}')
  ]),
  country('LB', 'Lebanon', 'Arabic', [
    retailer('Amazon AE', 'https://www.amazon.ae/s?k={query}'),
    retailer('Virgin Megastore', 'https://www.virginmegastore.me/lb-en/search/?text={query}'),
    retailer('Khoury Home', 'https://www.khouryhome.com/catalogsearch/result/?q={query}'),
    retailer('Antoine', 'https://www.antoineonline.com/search?query={query}')
  ]),
  country('EG', 'Egypt', 'Arabic', [
    retailer('Amazon EG', 'https://www.amazon.eg/s?k={query}'),
    retailer('Noon', 'https://www.noon.com/egypt-en/search/?q={query}'),
    retailer('Jumia', 'https://www.jumia.com.eg/catalog/?q={query}'),
    retailer('B.TECH', 'https://btech.com/en/catalogsearch/result/?q={query}')
  ]),
  country('MA', 'Morocco', 'French', [
    retailer('Jumia', 'https://www.jumia.ma/catalog/?q={query}'),
    retailer('Marjane', 'https://www.marjanemall.ma/catalogsearch/result/?q={query}'),
    retailer('Electroplanet', 'https://www.electroplanet.ma/catalogsearch/result/?q={query}'),
    retailer('Amazon FR', 'https://www.amazon.fr/s?k={query}')
  ]),
  country('DZ', 'Algeria', 'Arabic', [
    retailer('Ouedkniss', 'https://www.ouedkniss.com/search?q={query}'),
    retailer('Batolis', 'https://www.batolis.com/search?controller=search&s={query}'),
    retailer('Uno', 'https://www.uno.dz/catalogsearch/result/?q={query}'),
    retailer('Amazon FR', 'https://www.amazon.fr/s?k={query}')
  ]),
  country('TN', 'Tunisia', 'French', [
    retailer('Jumia', 'https://www.jumia.com.tn/catalog/?q={query}'),
    retailer('Tunisianet', 'https://www.tunisianet.com.tn/recherche?controller=search&s={query}'),
    retailer('Mytek', 'https://www.mytek.tn/catalogsearch/result/?q={query}'),
    retailer('Amazon FR', 'https://www.amazon.fr/s?k={query}')
  ]),
  country('NG', 'Nigeria', 'English', [
    retailer('Jumia', 'https://www.jumia.com.ng/catalog/?q={query}'),
    retailer('Konga', 'https://www.konga.com/search?search={query}'),
    retailer('Slot', 'https://slot.ng/catalogsearch/result/?q={query}'),
    retailer('Kara', 'https://kara.com.ng/catalogsearch/result/?q={query}')
  ]),
  country('KE', 'Kenya', 'English', [
    retailer('Jumia', 'https://www.jumia.co.ke/catalog/?q={query}'),
    retailer('Kilimall', 'https://www.kilimall.co.ke/new/search?q={query}'),
    retailer('Carrefour', 'https://www.carrefour.ke/mafken/en/search?text={query}'),
    retailer('Sky.Garden', 'https://sky.garden/search?query={query}')
  ]),
  country('GH', 'Ghana', 'English', [
    retailer('Jumia', 'https://www.jumia.com.gh/catalog/?q={query}'),
    retailer('Melcom', 'https://melcom.com/catalogsearch/result/?q={query}'),
    retailer('SuperPrice', 'https://www.superprice.com.gh/catalogsearch/result/?q={query}'),
    retailer('Electromart', 'https://www.electromart.com.gh/catalogsearch/result/?q={query}')
  ]),
  country('ZA', 'South Africa', 'English', [
    retailer('Takealot', 'https://www.takealot.com/all?qsearch={query}'),
    retailer('Woolworths', 'https://www.woolworths.co.za/cat/_/N-1z13sk5?searchTerm={query}'),
    retailer('Superbalist', 'https://superbalist.com/catalog/?q={query}'),
    retailer('Makro', 'https://www.makro.co.za/search/?text={query}')
  ]),
  country('ET', 'Ethiopia', 'English', [
    retailer('Jiji', 'https://jiji.com.et/search?query={query}'),
    retailer('Edomias', 'https://edomias.com/search?query={query}'),
    retailer('Amazon', 'https://www.amazon.com/s?k={query}'),
    retailer('AliExpress', 'https://www.aliexpress.com/wholesale?SearchText={query}')
  ]),
  country('UG', 'Uganda', 'English', [
    retailer('Jiji', 'https://jiji.ug/search?query={query}'),
    retailer('Jumia', 'https://www.jumia.ug/catalog/?q={query}'),
    retailer('Kikuubo Online', 'https://kikuuboonline.com/search?q={query}'),
    retailer('Amazon', 'https://www.amazon.com/s?k={query}')
  ]),
  country('TZ', 'Tanzania', 'English', [
    retailer('Zudua', 'https://www.zudua.co.tz/search?keyword={query}'),
    retailer('Jumia', 'https://www.jumia.co.tz/catalog/?q={query}'),
    retailer('ShopZetu', 'https://shopzetu.com/search?type=product&q={query}'),
    retailer('AliExpress', 'https://www.aliexpress.com/wholesale?SearchText={query}')
  ]),
  country('CI', 'Cote d\'Ivoire', 'French', [
    retailer('Jumia', 'https://www.jumia.ci/catalog/?q={query}'),
    retailer('Prosuma', 'https://www.prosuma.ci/catalogsearch/result/?q={query}'),
    retailer('Sococe', 'https://www.sococe.ci/search?query={query}'),
    retailer('AliExpress', 'https://www.aliexpress.com/wholesale?SearchText={query}')
  ]),
  country('CM', 'Cameroon', 'French', [
    retailer('Glotelho', 'https://glotelho.cm/search?controller=search&s={query}'),
    retailer('Jumia', 'https://www.jumia.cm/catalog/?q={query}'),
    retailer('Bazar Camer', 'https://bazarcamer.com/recherche?controller=search&s={query}'),
    retailer('AliExpress', 'https://www.aliexpress.com/wholesale?SearchText={query}')
  ]),
  country('SN', 'Senegal', 'French', [
    retailer('Jumia', 'https://www.jumia.sn/catalog/?q={query}'),
    retailer('Auchan', 'https://www.auchan.sn/catalogsearch/result/?q={query}'),
    retailer('Expat Dakar', 'https://www.expat-dakar.com/search?query={query}'),
    retailer('AliExpress', 'https://www.aliexpress.com/wholesale?SearchText={query}')
  ]),
  country('ZM', 'Zambia', 'English', [
    retailer('Jumia', 'https://www.jumia.co.zm/catalog/?q={query}'),
    retailer('Shoprite', 'https://www.shoprite.com.zm/search?q={query}'),
    retailer('Game', 'https://www.game.co.za/game-za/en/search/?text={query}'),
    retailer('AliExpress', 'https://www.aliexpress.com/wholesale?SearchText={query}')
  ]),
  country('ZW', 'Zimbabwe', 'English', [
    retailer('TechnoMag', 'https://technomag.co.zw/catalogsearch/result/?q={query}'),
    retailer('TV Sales & Home', 'https://www.tvsales.co.zw/catalogsearch/result/?q={query}'),
    retailer('Amazon', 'https://www.amazon.com/s?k={query}'),
    retailer('AliExpress', 'https://www.aliexpress.com/wholesale?SearchText={query}')
  ]),

  // East Asia, Southeast Asia, and Oceania
  country('CN', 'China', 'Chinese', [
    retailer('JD', 'https://search.jd.com/Search?keyword={query}'),
    retailer('Tmall', 'https://list.tmall.com/search_product.htm?q={query}'),
    retailer('Taobao', 'https://s.taobao.com/search?q={query}'),
    retailer('Suning', 'https://search.suning.com/{query}/')
  ]),
  country('JP', 'Japan', 'Japanese', [
    retailer('Amazon JP', 'https://www.amazon.co.jp/s?k={query}'),
    retailer('Rakuten', 'https://search.rakuten.co.jp/search/mall/{query}/'),
    retailer('Yahoo Shopping', 'https://shopping.yahoo.co.jp/search?p={query}'),
    retailer('BicCamera', 'https://www.biccamera.com/bc/category/?q={query}')
  ]),
  country('KR', 'South Korea', 'Korean', [
    retailer('Coupang', 'https://www.coupang.com/np/search?component=&q={query}'),
    retailer('Naver Shopping', 'https://search.shopping.naver.com/search/all?query={query}'),
    retailer('Gmarket', 'https://browse.gmarket.co.kr/search?keyword={query}'),
    retailer('11st', 'https://search.11st.co.kr/Search.tmall?kwd={query}')
  ]),
  country('TW', 'Taiwan', 'Traditional Chinese', [
    retailer('Shopee TW', 'https://shopee.tw/search?keyword={query}'),
    retailer('PChome', 'https://ecshweb.pchome.com.tw/search/v3.3/?q={query}'),
    retailer('momo', 'https://www.momoshop.com.tw/search/searchShop.jsp?keyword={query}'),
    retailer('Yahoo Shopping', 'https://tw.buy.yahoo.com/search/product?p={query}')
  ]),
  country('HK', 'Hong Kong', 'Traditional Chinese', [
    retailer('HKTVmall', 'https://www.hktvmall.com/hktv/en/search_a?query={query}'),
    retailer('Fortress', 'https://www.fortress.com.hk/en/search?keyword={query}'),
    retailer('Lane Crawford', 'https://www.lanecrawford.com/search/?q={query}'),
    retailer('Amazon', 'https://www.amazon.com/s?k={query}')
  ]),
  country('SG', 'Singapore', 'English', [
    retailer('Amazon SG', 'https://www.amazon.sg/s?k={query}'),
    retailer('Lazada', 'https://www.lazada.sg/catalog/?q={query}'),
    retailer('Shopee SG', 'https://shopee.sg/search?keyword={query}'),
    retailer('Qoo10', 'https://www.qoo10.sg/s/?keyword={query}')
  ]),
  country('MY', 'Malaysia', 'English', [
    retailer('Shopee MY', 'https://shopee.com.my/search?keyword={query}'),
    retailer('Lazada', 'https://www.lazada.com.my/catalog/?q={query}'),
    retailer('ZALORA', 'https://www.zalora.com.my/catalog/?q={query}'),
    retailer('Amazon SG', 'https://www.amazon.sg/s?k={query}')
  ]),
  country('TH', 'Thailand', 'Thai', [
    retailer('Shopee TH', 'https://shopee.co.th/search?keyword={query}'),
    retailer('Lazada', 'https://www.lazada.co.th/catalog/?q={query}'),
    retailer('Central', 'https://www.central.co.th/en/search/{query}'),
    retailer('Power Buy', 'https://www.powerbuy.co.th/en/search/{query}')
  ]),
  country('VN', 'Vietnam', 'Vietnamese', [
    retailer('Shopee VN', 'https://shopee.vn/search?keyword={query}'),
    retailer('Lazada', 'https://www.lazada.vn/catalog/?q={query}'),
    retailer('Tiki', 'https://tiki.vn/search?q={query}'),
    retailer('Sendo', 'https://www.sendo.vn/tim-kiem?q={query}')
  ]),
  country('ID', 'Indonesia', 'Indonesian', [
    retailer('Tokopedia', 'https://www.tokopedia.com/search?st=product&q={query}'),
    retailer('Shopee ID', 'https://shopee.co.id/search?keyword={query}'),
    retailer('Blibli', 'https://www.blibli.com/cari/{query}'),
    retailer('Lazada', 'https://www.lazada.co.id/catalog/?q={query}')
  ]),
  country('PH', 'Philippines', 'English', [
    retailer('Shopee PH', 'https://shopee.ph/search?keyword={query}'),
    retailer('Lazada', 'https://www.lazada.com.ph/catalog/?q={query}'),
    retailer('SM Store', 'https://www.shopSM.com/search?text={query}'),
    retailer('ZALORA', 'https://www.zalora.com.ph/catalog/?q={query}')
  ]),
  country('AU', 'Australia', 'English', [
    retailer('Amazon AU', 'https://www.amazon.com.au/s?k={query}'),
    retailer('Myer', 'https://www.myer.com.au/search?query={query}'),
    retailer('THE ICONIC', 'https://www.theiconic.com.au/catalog/?q={query}'),
    retailer('JB Hi-Fi', 'https://www.jbhifi.com.au/search?query={query}')
  ]),
  country('NZ', 'New Zealand', 'English', [
    retailer('Mighty Ape', 'https://www.mightyape.co.nz/search?q={query}'),
    retailer('Farmers', 'https://www.farmers.co.nz/search?text={query}'),
    retailer('The Warehouse', 'https://www.thewarehouse.co.nz/search?q={query}'),
    retailer('Amazon AU', 'https://www.amazon.com.au/s?k={query}')
  ]),
  country('KZ', 'Kazakhstan', 'Russian', [
    retailer('Kaspi', 'https://kaspi.kz/shop/search/?text={query}'),
    retailer('Technodom', 'https://www.technodom.kz/search?recommended_by=instant_search&recommended_code={query}'),
    retailer('Wildberries KZ', 'https://www.wildberries.kz/catalog/0/search.aspx?search={query}'),
    retailer('Ozon KZ', 'https://ozon.kz/search/?text={query}')
  ]),
  country('UZ', 'Uzbekistan', 'Uzbek', [
    retailer('Uzum', 'https://uzum.uz/en/search?query={query}'),
    retailer('Asaxiy', 'https://asaxiy.uz/product?key={query}'),
    retailer('Mediapark', 'https://mediapark.uz/search?query={query}'),
    retailer('Wildberries UZ', 'https://uz.wildberries.ru/catalog/0/search.aspx?search={query}')
  ]),
  country('AZ', 'Azerbaijan', 'Azerbaijani', [
    retailer('Umico', 'https://umico.az/en/search?query={query}'),
    retailer('Kontakt Home', 'https://kontakt.az/search?query={query}'),
    retailer('Baku Electronics', 'https://bakuelectronics.az/catalogsearch/result/?q={query}'),
    retailer('AliExpress', 'https://www.aliexpress.com/wholesale?SearchText={query}')
  ]),
  country('GE', 'Georgia', 'Georgian', [
    retailer('Extra', 'https://extra.ge/search?keyword={query}'),
    retailer('Alta', 'https://alta.ge/search/?sl={query}'),
    retailer('Vendoo', 'https://vendoo.ge/search?query={query}'),
    retailer('Amazon DE', 'https://www.amazon.de/s?k={query}')
  ]),
  country('AM', 'Armenia', 'Armenian', [
    retailer('List.am', 'https://www.list.am/category?q={query}'),
    retailer('VEGA', 'https://vega.am/search?keyword={query}'),
    retailer('Zigzag', 'https://zigzag.am/en/search?q={query}'),
    retailer('AliExpress', 'https://www.aliexpress.com/wholesale?SearchText={query}')
  ]),
  country('MN', 'Mongolia', 'Mongolian', [
    retailer('Shoppy', 'https://shoppy.mn/search?keyword={query}'),
    retailer('Nomin', 'https://www.nomin.mn/search?keyword={query}'),
    retailer('BSB', 'https://bsb.mn/search?query={query}'),
    retailer('AliExpress', 'https://www.aliexpress.com/wholesale?SearchText={query}')
  ]),
  country('KH', 'Cambodia', 'English', [
    retailer('Little Fashion', 'https://www.littlefashion.com/search?type=product&q={query}'),
    retailer('AEON Online', 'https://aeononlineshopping.com/search?q={query}'),
    retailer('Smile Shop', 'https://www.smileshop.asia/search?type=product&q={query}'),
    retailer('AliExpress', 'https://www.aliexpress.com/wholesale?SearchText={query}')
  ])
];

const COUNTRY_BY_CODE = COUNTRY_RETAILER_CATALOG.reduce<Record<string, CountryRetailerConfig>>((acc, entry) => {
  acc[entry.code] = entry;
  return acc;
}, {});

const TIMEZONE_TO_COUNTRY: Record<string, string> = {
  'Africa/Cairo': 'EG',
  'Africa/Casablanca': 'MA',
  'Africa/Johannesburg': 'ZA',
  'Africa/Lagos': 'NG',
  'Africa/Nairobi': 'KE',
  'America/Argentina/Buenos_Aires': 'AR',
  'America/Bogota': 'CO',
  'America/Chicago': 'US',
  'America/Costa_Rica': 'CR',
  'America/Denver': 'US',
  'America/Guatemala': 'GT',
  'America/Halifax': 'CA',
  'America/Lima': 'PE',
  'America/Los_Angeles': 'US',
  'America/Mexico_City': 'MX',
  'America/New_York': 'US',
  'America/Panama': 'PA',
  'America/Phoenix': 'US',
  'America/Santiago': 'CL',
  'America/Sao_Paulo': 'BR',
  'America/Toronto': 'CA',
  'America/Vancouver': 'CA',
  'Asia/Almaty': 'KZ',
  'Asia/Amman': 'JO',
  'Asia/Baku': 'AZ',
  'Asia/Bangkok': 'TH',
  'Asia/Colombo': 'LK',
  'Asia/Dhaka': 'BD',
  'Asia/Dubai': 'AE',
  'Asia/Hong_Kong': 'HK',
  'Asia/Jakarta': 'ID',
  'Asia/Jerusalem': 'IL',
  'Asia/Karachi': 'PK',
  'Asia/Kathmandu': 'NP',
  'Asia/Kolkata': 'IN',
  'Asia/Kuala_Lumpur': 'MY',
  'Asia/Kuwait': 'KW',
  'Asia/Manila': 'PH',
  'Asia/Novosibirsk': 'RU',
  'Asia/Qatar': 'QA',
  'Asia/Riyadh': 'SA',
  'Asia/Seoul': 'KR',
  'Asia/Shanghai': 'CN',
  'Asia/Singapore': 'SG',
  'Asia/Taipei': 'TW',
  'Asia/Tashkent': 'UZ',
  'Asia/Tbilisi': 'GE',
  'Asia/Tokyo': 'JP',
  'Asia/Ulaanbaatar': 'MN',
  'Asia/Yerevan': 'AM',
  'Asia/Ho_Chi_Minh': 'VN',
  'Australia/Brisbane': 'AU',
  'Australia/Melbourne': 'AU',
  'Australia/Perth': 'AU',
  'Australia/Sydney': 'AU',
  'Europe/Athens': 'GR',
  'Europe/Belgrade': 'RS',
  'Europe/Berlin': 'DE',
  'Europe/Brussels': 'BE',
  'Europe/Bucharest': 'RO',
  'Europe/Budapest': 'HU',
  'Europe/Copenhagen': 'DK',
  'Europe/Dublin': 'IE',
  'Europe/Helsinki': 'FI',
  'Europe/Istanbul': 'TR',
  'Europe/Kiev': 'UA',
  'Europe/Lisbon': 'PT',
  'Europe/London': 'GB',
  'Europe/Madrid': 'ES',
  'Europe/Oslo': 'NO',
  'Europe/Paris': 'FR',
  'Europe/Prague': 'CZ',
  'Europe/Riga': 'LV',
  'Europe/Rome': 'IT',
  'Europe/Sofia': 'BG',
  'Europe/Stockholm': 'SE',
  'Europe/Tallinn': 'EE',
  'Europe/Vienna': 'AT',
  'Europe/Vilnius': 'LT',
  'Europe/Warsaw': 'PL',
  'Europe/Zurich': 'CH',
  'Pacific/Auckland': 'NZ'
};

const normalizeCountryCode = (value?: string | null) => value?.trim().toUpperCase() ?? '';

const extractRegionFromLocale = (locale: string) => {
  if (!locale) {
    return '';
  }

  try {
    if (typeof Intl !== 'undefined' && typeof Intl.Locale === 'function') {
      const region = new Intl.Locale(locale).maximize().region;
      if (region) {
        return region.toUpperCase();
      }
    }
  } catch {
    // Fall through to regex parsing.
  }

  const match = locale.toUpperCase().match(/[-_](?<region>[A-Z]{2})\b/);
  return match?.groups?.region ?? '';
};

export const getCountryConfig = (countryCode?: string | null) => {
  const normalized = normalizeCountryCode(countryCode);
  return COUNTRY_BY_CODE[normalized] ?? COUNTRY_BY_CODE[DEFAULT_COUNTRY_CODE];
};

export const buildRetailerSearchUrl = (searchUrl: string, query: string) =>
  searchUrl.replace('{query}', encodeURIComponent(query));

export const detectCountryCode = () => {
  const localeCandidates = new Set<string>();

  if (typeof navigator !== 'undefined') {
    navigator.languages?.forEach((locale) => locale && localeCandidates.add(locale));

    if (navigator.language) {
      localeCandidates.add(navigator.language);
    }
  }

  if (typeof Intl !== 'undefined') {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale;
    if (locale) {
      localeCandidates.add(locale);
    }
  }

  for (const locale of localeCandidates) {
    const region = extractRegionFromLocale(locale);
    if (region && COUNTRY_BY_CODE[region]) {
      return region;
    }
  }

  if (typeof Intl !== 'undefined') {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timeZone && TIMEZONE_TO_COUNTRY[timeZone]) {
      return TIMEZONE_TO_COUNTRY[timeZone];
    }
  }

  return DEFAULT_COUNTRY_CODE;
};

export const COUNTRY_OPTIONS = COUNTRY_RETAILER_CATALOG.map(({ code, name }) => ({ code, name }));
