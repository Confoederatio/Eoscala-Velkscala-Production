//Initialise functions
{
  global.getCountryObjectByRGB = function (arg0_rgb) {
    //Convert from parameters
    var rgb = getList(arg0_rgb);

    //Initialise main.countries if not already defined
    if (!main.countries)
      main.countries = getWorldBankSubdivisions();

    //Return statement if found
    if (main.countries[rgb.join(",")])
      return main.countries[rgb.join(",")];

    //Return statement; NODATA_value
    return main.countries.NODATA_value;
  };

  global.getWorldBankPPPScalars = function () {
    //Return statement
    return {
      "Aruba": {
        "ppp_relative_scalar": 0.8640938092,
        "ppp_absolute_scalar": 0.6646875456
      },
      "Afghanistan": {
        "ppp_relative_scalar": 0.6139515027,
        "ppp_absolute_scalar": 0.4722703867
      },
      "Angola": {
        "ppp_relative_scalar": 0.03225496412,
        "ppp_absolute_scalar": 0.02481151086
      },
      "Albania": {
        "ppp_relative_scalar": 0.9580933829,
        "ppp_absolute_scalar": 0.7369949099
      },
      "Andorra": {
        "ppp_relative_scalar": 0.9777598046,
        "ppp_absolute_scalar": 0.7521229266
      },
      "United Arab Emirates": {
        "ppp_relative_scalar": 0.5647932342,
        "ppp_absolute_scalar": 0.434456334
      },
      "Argentina": {
        "ppp_relative_scalar": 0.2429777476,
        "ppp_absolute_scalar": 0.1869059597
      },
      "Armenia": {
        "ppp_relative_scalar": 0.773094703,
        "ppp_absolute_scalar": 0.5946882331
      },
      "Antigua and Barbuda": {
        "ppp_relative_scalar": 0.9980114906,
        "ppp_absolute_scalar": 0.7677011466
      },
      "Australia": {
        "ppp_relative_scalar": 0.868322202,
        "ppp_absolute_scalar": 0.6679401554
      },
      "Austria": {
        "ppp_relative_scalar": 1.091572505,
        "ppp_absolute_scalar": 0.8396711579
      },
      "Azerbaijan": {
        "ppp_relative_scalar": 0.4519455094,
        "ppp_absolute_scalar": 0.3476503918
      },
      "Burundi": {
        "ppp_relative_scalar": 0.4047035779,
        "ppp_absolute_scalar": 0.3113104445
      },
      "Belgium": {
        "ppp_relative_scalar": 1.081846496,
        "ppp_absolute_scalar": 0.832189612
      },
      "Benin": {
        "ppp_relative_scalar": 0.9396054784,
        "ppp_absolute_scalar": 0.7227734449
      },
      "Burkina Faso": {
        "ppp_relative_scalar": 0.8838032246,
        "ppp_absolute_scalar": 0.6798486343
      },
      "Bangladesh": {
        "ppp_relative_scalar": 0.6754485436,
        "ppp_absolute_scalar": 0.5195758028
      },
      "Bulgaria": {
        "ppp_relative_scalar": 0.7644903278,
        "ppp_absolute_scalar": 0.5880694829
      },
      "Bahrain": {
        "ppp_relative_scalar": 0.6547100968,
        "ppp_absolute_scalar": 0.5036231514
      },
      "Bahamas, The": {
        "ppp_relative_scalar": 1.089077089,
        "ppp_absolute_scalar": 0.8377516068
      },
      "Bosnia and Herzegovina": {
        "ppp_relative_scalar": 0.9540558362,
        "ppp_absolute_scalar": 0.7338891048
      },
      "Belarus": {
        "ppp_relative_scalar": 0.0805492732,
        "ppp_absolute_scalar": 0.06196097939
      },
      "Belize": {
        "ppp_relative_scalar": 1.087570098,
        "ppp_absolute_scalar": 0.8365923832
      },
      "Bermuda": {
        "ppp_relative_scalar": 0.8478990792,
        "ppp_absolute_scalar": 0.652230061
      },
      "Bolivia": {
        "ppp_relative_scalar": 0.6025824348,
        "ppp_absolute_scalar": 0.4635249498
      },
      "Brazil": {
        "ppp_relative_scalar": 0.5144494837,
        "ppp_absolute_scalar": 0.3957303721
      },
      "Barbados": {
        "ppp_relative_scalar": 0.767145971,
        "ppp_absolute_scalar": 0.5901122854
      },
      "Brunei Darussalam": {
        "ppp_relative_scalar": 0.6733192537,
        "ppp_absolute_scalar": 0.5179378875
      },
      "Bhutan": {
        "ppp_relative_scalar": 0.6796400267,
        "ppp_absolute_scalar": 0.5228000205
      },
      "Botswana": {
        "ppp_relative_scalar": 0.5024762421,
        "ppp_absolute_scalar": 0.3865201862
      },
      "Central African Republic": {
        "ppp_relative_scalar": 1.033866432,
        "ppp_absolute_scalar": 0.7952818707
      },
      "Canada": {
        "ppp_relative_scalar": 0.9900758446,
        "ppp_absolute_scalar": 0.7615968035
      },
      "Switzerland": {
        "ppp_relative_scalar": 1.279901653,
        "ppp_absolute_scalar": 0.9845397329
      },
      "Chile": {
        "ppp_relative_scalar": 0.8345160371,
        "ppp_absolute_scalar": 0.6419354131
      },
      "China": {
        "ppp_relative_scalar": 0.7723498355,
        "ppp_absolute_scalar": 0.5941152581
      },
      "Cote d'Ivoire": {
        "ppp_relative_scalar": 0.9226707314,
        "ppp_absolute_scalar": 0.7097467165
      },
      "Cameroon": {
        "ppp_relative_scalar": 0.9998340275,
        "ppp_absolute_scalar": 0.7691030981
      },
      "Congo, Dem. Rep.": {
        "ppp_relative_scalar": 0.1176590536,
        "ppp_absolute_scalar": 0.09050696428
      },
      "Congo, Rep.": {
        "ppp_relative_scalar": 0.7004644944,
        "ppp_absolute_scalar": 0.5388188418
      },
      "Colombia": {
        "ppp_relative_scalar": 0.6739125336,
        "ppp_absolute_scalar": 0.5183942566
      },
      "Comoros": {
        "ppp_relative_scalar": 0.8751691801,
        "ppp_absolute_scalar": 0.6732070616
      },
      "Cabo Verde": {
        "ppp_relative_scalar": 1.072506764,
        "ppp_absolute_scalar": 0.8250052029
      },
      "Costa Rica": {
        "ppp_relative_scalar": 0.4328252935,
        "ppp_absolute_scalar": 0.3329425334
      },
      "Cuba": {
        "ppp_relative_scalar": 0,
        "ppp_absolute_scalar": 0
      },
      "Curacao": {
        "ppp_relative_scalar": 0.9778774428,
        "ppp_absolute_scalar": 0.7522134175
      },
      "Cayman Islands": {
        "ppp_relative_scalar": 0,
        "ppp_absolute_scalar": 0
      },
      "Cyprus": {
        "ppp_relative_scalar": 1.026319926,
        "ppp_absolute_scalar": 0.789476866
      },
      "Czechia": {
        "ppp_relative_scalar": 1.073830909,
        "ppp_absolute_scalar": 0.8260237762
      },
      "Germany": {
        "ppp_relative_scalar": 1.195695915,
        "ppp_absolute_scalar": 0.9197660882
      },
      "Djibouti": {
        "ppp_relative_scalar": 0,
        "ppp_absolute_scalar": 0
      },
      "Dominica": {
        "ppp_relative_scalar": 1.061691226,
        "ppp_absolute_scalar": 0.8166855586
      },
      "Denmark": {
        "ppp_relative_scalar": 1.161214396,
        "ppp_absolute_scalar": 0.8932418433
      },
      "Dominican Republic": {
        "ppp_relative_scalar": 0.3689256736,
        "ppp_absolute_scalar": 0.2837889797
      },
      "Algeria": {
        "ppp_relative_scalar": 0.5347671609,
        "ppp_absolute_scalar": 0.4113593546
      },
      "Ecuador": {
        "ppp_relative_scalar": 0.4571516296,
        "ppp_absolute_scalar": 0.3516550997
      },
      "Egypt, Arab Rep.": {
        "ppp_relative_scalar": 0.5097482483,
        "ppp_absolute_scalar": 0.3921140371
      },
      "Eritrea": {
        "ppp_relative_scalar": 0.3195852855,
        "ppp_absolute_scalar": 0.245834835
      },
      "Spain": {
        "ppp_relative_scalar": 1.03591508,
        "ppp_absolute_scalar": 0.7968577537
      },
      "Estonia": {
        "ppp_relative_scalar": 0.9164581704,
        "ppp_absolute_scalar": 0.7049678234
      },
      "Ethiopia": {
        "ppp_relative_scalar": 0.4174871111,
        "ppp_absolute_scalar": 0.3211439316
      },
      "Finland": {
        "ppp_relative_scalar": 1.095683178,
        "ppp_absolute_scalar": 0.8428332136
      },
      "Fiji": {
        "ppp_relative_scalar": 0.7963058433,
        "ppp_absolute_scalar": 0.6125429564
      },
      "France": {
        "ppp_relative_scalar": 1.10565025,
        "ppp_absolute_scalar": 0.8505001923
      },
      "Faroe Islands": {
        "ppp_relative_scalar": 0,
        "ppp_absolute_scalar": 0
      },
       "Micronesia, Fed. Sts.": {
        "ppp_relative_scalar": 0.9932544116,
        "ppp_absolute_scalar": 0.7640418551
      },
      "Gabon": {
        "ppp_relative_scalar": 0.693950505,
        "ppp_absolute_scalar": 0.5338080808
      },
      "United Kingdom": {
        "ppp_relative_scalar": 0.9978330208,
        "ppp_absolute_scalar": 0.7675638622
      },
      "Georgia": {
        "ppp_relative_scalar": 0.5865224481,
        "ppp_absolute_scalar": 0.4511711139
      },
      "Ghana": {
        "ppp_relative_scalar": 0.186911362,
        "ppp_absolute_scalar": 0.1437779708
      },
      "Guinea": {
        "ppp_relative_scalar": 0.3044931142,
        "ppp_absolute_scalar": 0.2342254724
      },
      "Gambia, The": {
        "ppp_relative_scalar": 0.291963658,
        "ppp_absolute_scalar": 0.2245874292
      },
      "Guinea-Bissau": {
        "ppp_relative_scalar": 0.9635551292,
        "ppp_absolute_scalar": 0.7411962532
      },
      "Equatorial Guinea": {
        "ppp_relative_scalar": 0.536025216,
        "ppp_absolute_scalar": 0.4123270892
      },
      "Greece": {
        "ppp_relative_scalar": 0.9390391818,
        "ppp_absolute_scalar": 0.7223378321
      },
      "Grenada": {
        "ppp_relative_scalar": 1.009980818,
        "ppp_absolute_scalar": 0.7769083217
      },
      "Greenland": {
        "ppp_relative_scalar": 1.037353922,
        "ppp_absolute_scalar": 0.7979645554
      },
      "Guatemala": {
        "ppp_relative_scalar": 0.6549796511,
        "ppp_absolute_scalar": 0.5038305008
      },
      "Guyana": {
        "ppp_relative_scalar": 0.722877915,
        "ppp_absolute_scalar": 0.5560599346
      },
      "Hong Kong SAR, China": {
        "ppp_relative_scalar": 1.358771008,
        "ppp_absolute_scalar": 1.045208468
      },
      "Honduras": {
        "ppp_relative_scalar": 0.6231350945,
        "ppp_absolute_scalar": 0.4793346881
      },
      "Croatia": {
        "ppp_relative_scalar": 1.009029436,
        "ppp_absolute_scalar": 0.7761764889
      },
      "Haiti": {
        "ppp_relative_scalar": 0.3906572609,
        "ppp_absolute_scalar": 0.3005055853
      },
      "Hungary": {
        "ppp_relative_scalar": 0.8857406999,
        "ppp_absolute_scalar": 0.6813389999
      },
      "Indonesia": {
        "ppp_relative_scalar": 0.3946907816,
        "ppp_absolute_scalar": 0.3036082935
      },
      "India": {
        "ppp_relative_scalar": 0.6221488058,
        "ppp_absolute_scalar": 0.4785760045
      },
      "Ireland": {
        "ppp_relative_scalar": 1.135074256,
        "ppp_absolute_scalar": 0.8731340432
      },
      "Iran, Islamic Rep.": {
        "ppp_relative_scalar": 0.1996672177,
        "ppp_absolute_scalar": 0.1535901675
      },
      "Iraq": {
        "ppp_relative_scalar": 0.3696334233,
        "ppp_absolute_scalar": 0.2843334025
      },
      "Iceland": {
        "ppp_relative_scalar": 0.6268704532,
        "ppp_absolute_scalar": 0.4822080409
      },
      "Israel": {
        "ppp_relative_scalar": 0.8701729356,
        "ppp_absolute_scalar": 0.6693637966
      },
      "Italy": {
        "ppp_relative_scalar": 1.061384998,
        "ppp_absolute_scalar": 0.8164499985
      },
      "Jamaica": {
        "ppp_relative_scalar": 0.4268155446,
        "ppp_absolute_scalar": 0.3283196497
      },
      "Jordan": {
        "ppp_relative_scalar": 0.678560595,
        "ppp_absolute_scalar": 0.5219696884
      },
      "Japan": {
        "ppp_relative_scalar": 1.439601881,
        "ppp_absolute_scalar": 1.107386062
      },
      "Kazakhstan": {
        "ppp_relative_scalar": 0.2754261918,
        "ppp_absolute_scalar": 0.2118663014
      },
      "Kenya": {
        "ppp_relative_scalar": 0.6134337077,
        "ppp_absolute_scalar": 0.4718720828
      },
      "Kyrgyz Republic": {
        "ppp_relative_scalar": 0.4556478834,
        "ppp_absolute_scalar": 0.3504983719
      },
      "Cambodia": {
        "ppp_relative_scalar": 0.6635165149,
        "ppp_absolute_scalar": 0.5103973192
      },
      "Kiribati": {
        "ppp_relative_scalar": 0.9257426682,
        "ppp_absolute_scalar": 0.7121097448
      },
      "St. Kitts and Nevis": {
        "ppp_relative_scalar": 0.8352752352,
        "ppp_absolute_scalar": 0.6425194117
      },
      "Korea, Rep.": {
        "ppp_relative_scalar": 0.874969911,
        "ppp_absolute_scalar": 0.6730537777
      },
      "Kuwait": {
        "ppp_relative_scalar": 0.5872995853,
        "ppp_absolute_scalar": 0.4517689118
      },
      "Lao PDR": {
        "ppp_relative_scalar": 0.5249571993,
        "ppp_absolute_scalar": 0.4038132302
      },
      "Lebanon": {
        "ppp_relative_scalar": 0.9599232595,
        "ppp_absolute_scalar": 0.7384025073
      },
      "Liberia": {
        "ppp_relative_scalar": 0.5664393239,
        "ppp_absolute_scalar": 0.4357225569
      },
      "Libya": {
        "ppp_relative_scalar": 0.3026475382,
        "ppp_absolute_scalar": 0.2328057986
      },
      "St. Lucia": {
        "ppp_relative_scalar": 0.9315511029,
        "ppp_absolute_scalar": 0.7165777714
      },
      "Sri Lanka": {
        "ppp_relative_scalar": 0.4857657923,
        "ppp_absolute_scalar": 0.3736659941
      },
      "Lesotho": {
        "ppp_relative_scalar": 0.591552634,
        "ppp_absolute_scalar": 0.4550404877
      },
      "Lithuania": {
        "ppp_relative_scalar": 0.9994357433,
        "ppp_absolute_scalar": 0.7687967256
      },
      "Luxembourg": {
        "ppp_relative_scalar": 1.055940842,
        "ppp_absolute_scalar": 0.812262186
      },
      "Latvia": {
        "ppp_relative_scalar": 0.7237826626,
        "ppp_absolute_scalar": 0.5567558943
      },
      "Macao SAR, China": {
        "ppp_relative_scalar": 0.8197480643,
        "ppp_absolute_scalar": 0.6305754341
      },
      "Morocco": {
        "ppp_relative_scalar": 1.103697494,
        "ppp_absolute_scalar": 0.8489980723
      },
      "Moldova": {
        "ppp_relative_scalar": 0.4272891139,
        "ppp_absolute_scalar": 0.3286839338
      },
      "Madagascar": {
        "ppp_relative_scalar": 0.4417849513,
        "ppp_absolute_scalar": 0.339834578
      },
      "Maldives": {
        "ppp_relative_scalar": 0.3886775482,
        "ppp_absolute_scalar": 0.2989827294
      },
      "Mexico": {
        "ppp_relative_scalar": 0.7921786396,
        "ppp_absolute_scalar": 0.6093681843
      },
       "Marshall Islands": {
        "ppp_relative_scalar": 0.9690715196,
        "ppp_absolute_scalar": 0.7454396305
      },
       "North Macedonia": {
        "ppp_relative_scalar": 1.033919317,
        "ppp_absolute_scalar": 0.7953225512
      },
      "Mali": {
        "ppp_relative_scalar": 0.7845252072,
        "ppp_absolute_scalar": 0.6034809286
      },
      "Malta": {
        "ppp_relative_scalar": 1.010159416,
        "ppp_absolute_scalar": 0.7770457044
      },
      "Myanmar": {
        "ppp_relative_scalar": 0.2269347096,
        "ppp_absolute_scalar": 0.1745651612
      },
        "Montenegro": {
        "ppp_relative_scalar": 0.8067005934,
        "ppp_absolute_scalar": 0.620538918
      },
      "Mongolia": {
        "ppp_relative_scalar": 0.2568750831,
        "ppp_absolute_scalar": 0.1975962178
      },
       "Mozambique": {
        "ppp_relative_scalar": 0.6247450123,
        "ppp_absolute_scalar": 0.4805730864
      },
       "Mauritania": {
        "ppp_relative_scalar": 0.4315113515,
        "ppp_absolute_scalar": 0.3319318088
      },
        "Mauritius": {
        "ppp_relative_scalar": 0.7310993679,
        "ppp_absolute_scalar": 0.5623841291
      },
        "Malawi": {
        "ppp_relative_scalar": 0.228172443,
        "ppp_absolute_scalar": 0.1755172639
      },
       "Malaysia": {
        "ppp_relative_scalar": 0.8124411191,
        "ppp_absolute_scalar": 0.624954707
      },
      "Namibia": {
        "ppp_relative_scalar": 0.6167852069,
        "ppp_absolute_scalar": 0.4744501592
      },
      "Niger": {
        "ppp_relative_scalar": 0.8003952464,
        "ppp_absolute_scalar": 0.6156886511
      },
      "Nigeria": {
        "ppp_relative_scalar": 0.2960862945,
        "ppp_absolute_scalar": 0.227758688
      },
      "Nicaragua": {
        "ppp_relative_scalar": 0.5279622492,
        "ppp_absolute_scalar": 0.4061248071
      },
      "Netherlands": {
        "ppp_relative_scalar": 1.065033221,
        "ppp_absolute_scalar": 0.8192563239
      },
      "Norway": {
        "ppp_relative_scalar": 1.000293634,
        "ppp_absolute_scalar": 0.7694566415
      },
      "Nepal": {
        "ppp_relative_scalar": 0.4990627794,
        "ppp_absolute_scalar": 0.3838944457
      },
      "Nauru": {
        "ppp_relative_scalar": 0.7132396396,
        "ppp_absolute_scalar": 0.5486458766
      },
      "New Zealand": {
        "ppp_relative_scalar": 0.9723544079,
        "ppp_absolute_scalar": 0.7479649291
      },
      "Oman": {
        "ppp_relative_scalar": 0.5143813412,
        "ppp_absolute_scalar": 0.3956779548
      },
      "Pakistan": {
        "ppp_relative_scalar": 0.5190082869,
        "ppp_absolute_scalar": 0.3992371437
      },
      "Panama": {
        "ppp_relative_scalar": 0.887796563,
        "ppp_absolute_scalar": 0.6829204331
      },
      "Peru": {
        "ppp_relative_scalar": 0.8779691805,
        "ppp_absolute_scalar": 0.675360908
      },
      "Philippines": {
        "ppp_relative_scalar": 0.7624015349,
        "ppp_absolute_scalar": 0.5864627191
      },
      "Palau": {
        "ppp_relative_scalar": 1.021116446,
        "ppp_absolute_scalar": 0.7854741895
      },
      "Papua New Guinea": {
        "ppp_relative_scalar": 0.6756339904,
        "ppp_absolute_scalar": 0.5197184542
      },
      "Poland": {
        "ppp_relative_scalar": 1.017491163,
        "ppp_absolute_scalar": 0.7826855097
      },
      "Puerto Rico": {
        "ppp_relative_scalar": 0.8235274406,
        "ppp_absolute_scalar": 0.6334826466
      },
      "Portugal": {
        "ppp_relative_scalar": 1.060905208,
        "ppp_absolute_scalar": 0.8160809296
      },
      "Paraguay": {
        "ppp_relative_scalar": 0.4102675807,
        "ppp_absolute_scalar": 0.3155904467
      },
      "West Bank and Gaza": {
        "ppp_relative_scalar": 0.8277333294,
        "ppp_absolute_scalar": 0.6367179457
      },
      "Qatar": {
        "ppp_relative_scalar": 0.5240739244,
        "ppp_absolute_scalar": 0.403133788
      },
      "Romania": {
        "ppp_relative_scalar": 0.3974770629,
        "ppp_absolute_scalar": 0.3057515869
      },
      "Russian Federation": {
        "ppp_relative_scalar": 0.3958746087,
        "ppp_absolute_scalar": 0.3045189297
      },
      "Rwanda": {
        "ppp_relative_scalar": 0.5823244651,
        "ppp_absolute_scalar": 0.4479418962
      },
      "Saudi Arabia": {
        "ppp_relative_scalar": 0.5687540977,
        "ppp_absolute_scalar": 0.4375031521
      },
      "Sudan": {
        "ppp_relative_scalar": 0.2889669465,
        "ppp_absolute_scalar": 0.2222822665
      },
      "Senegal": {
        "ppp_relative_scalar": 0.904430835,
        "ppp_absolute_scalar": 0.6957160269
      },
      "Singapore": {
        "ppp_relative_scalar": 1.109253356,
        "ppp_absolute_scalar": 0.8532718122
      },
      "Solomon Islands": {
        "ppp_relative_scalar": 0.5998369556,
        "ppp_absolute_scalar": 0.4614130428
      },
      "Sierra Leone": {
        "ppp_relative_scalar": 0.2620213056,
        "ppp_absolute_scalar": 0.2015548505
      },
      "El Salvador": {
        "ppp_relative_scalar": 0.8876406711,
        "ppp_absolute_scalar": 0.6828005162
      },
      "San Marino": {
        "ppp_relative_scalar": 1.067106256,
        "ppp_absolute_scalar": 0.8208509661
      },
      "Somalia": {
        "ppp_relative_scalar": 0.9889674151,
        "ppp_absolute_scalar": 0.7607441655
      },
      "Serbia": {
        "ppp_relative_scalar": 0.2642547464,
        "ppp_absolute_scalar": 0.2032728819
      },
      "South Sudan": {
        "ppp_relative_scalar": 0,
        "ppp_absolute_scalar": 0
      },
      "Sao Tome and Principe": {
        "ppp_relative_scalar": 0.3103302889,
        "ppp_absolute_scalar": 0.2387156068
      },
      "Suriname": {
        "ppp_relative_scalar": 0.2424586788,
        "ppp_absolute_scalar": 0.186506676
      },
      "Slovak Republic": {
        "ppp_relative_scalar": 1.019703519,
        "ppp_absolute_scalar": 0.7843873224
      },
      "Slovenia": {
        "ppp_relative_scalar": 0.8438081959,
        "ppp_absolute_scalar": 0.6490832276
      },
      "Sweden": {
        "ppp_relative_scalar": 1.036074795,
        "ppp_absolute_scalar": 0.7969806114
      },
      "Eswatini": {
        "ppp_relative_scalar": 0.6276275639,
        "ppp_absolute_scalar": 0.4827904338
      },
      "Sint Maarten (Dutch part)": {
        "ppp_relative_scalar": 0,
        "ppp_absolute_scalar": 0
      },
      "Seychelles": {
        "ppp_relative_scalar": 0.4572412147,
        "ppp_absolute_scalar": 0.3517240113
      },
      "Chad": {
        "ppp_relative_scalar": 0.6226446876,
        "ppp_absolute_scalar": 0.478957452
      },
      "Togo": {
        "ppp_relative_scalar": 0.9684786754,
        "ppp_absolute_scalar": 0.7449835965
      },
      "Thailand": {
        "ppp_relative_scalar": 0.8911500858,
        "ppp_absolute_scalar": 0.685500066
      },
      "Tajikistan": {
        "ppp_relative_scalar": 0.1753465049,
        "ppp_absolute_scalar": 0.1348819268
      },
      "Turkmenistan": {
        "ppp_relative_scalar": 0.3204968367,
        "ppp_absolute_scalar": 0.2465360282
      },
      "Timor-Leste": {
        "ppp_relative_scalar": 0.7304886677,
        "ppp_absolute_scalar": 0.5619143598
      },
      "Tonga": {
        "ppp_relative_scalar": 0.5871541031,
        "ppp_absolute_scalar": 0.4516570024
      },
      "Trinidad and Tobago": {
        "ppp_relative_scalar": 0.7063016338,
        "ppp_absolute_scalar": 0.5433089491
      },
      "Tunisia": {
        "ppp_relative_scalar": 0.8488083396,
        "ppp_absolute_scalar": 0.652929492
      },
      "Turkiye": {
        "ppp_relative_scalar": 0.291452075,
        "ppp_absolute_scalar": 0.2241939038
      },
      "Tuvalu": {
        "ppp_relative_scalar": 0.9450064178,
        "ppp_absolute_scalar": 0.7269280137
      },
      "Tanzania": {
        "ppp_relative_scalar": 0.5059738048,
        "ppp_absolute_scalar": 0.3892106191
      },
      "Uganda": {
        "ppp_relative_scalar": 0.6558403597,
        "ppp_absolute_scalar": 0.5044925844
      },
      "Ukraine": {
        "ppp_relative_scalar": 0.2633141758,
        "ppp_absolute_scalar": 0.202549366
      },
      "Uruguay": {
        "ppp_relative_scalar": 0.5064872139,
        "ppp_absolute_scalar": 0.3896055492
      },
      "United States": {
        "ppp_relative_scalar": 1,
        "ppp_absolute_scalar": 0.7692307692
      },
      "Uzbekistan": {
        "ppp_relative_scalar": 0.08796426389,
        "ppp_absolute_scalar": 0.06766481838
      },
      "St. Vincent and the Grenadines": {
        "ppp_relative_scalar": 0.911911756,
        "ppp_absolute_scalar": 0.7014705815
      },
      "Venezuela, RB": {
        "ppp_relative_scalar": 0.1046363668,
        "ppp_absolute_scalar": 0.08048951292
      },
      "British Virgin Islands": {
        "ppp_relative_scalar": 0,
        "ppp_absolute_scalar": 0
      },
      "Virgin Islands (U.S.)": {
        "ppp_relative_scalar": 0,
        "ppp_absolute_scalar": 0
      },
      "Viet Nam": {
        "ppp_relative_scalar": 0.4020556223,
        "ppp_absolute_scalar": 0.3092735556
      },
      "Vanuatu": {
        "ppp_relative_scalar": 0.9064407687,
        "ppp_absolute_scalar": 0.6972621298
      },
      "Samoa": {
        "ppp_relative_scalar": 0.889978066,
        "ppp_absolute_scalar": 0.6845985123
      },
      "Kosovo": {
        "ppp_relative_scalar": 0,
        "ppp_absolute_scalar": 0
      },
      "Yemen, Rep.": {
        "ppp_relative_scalar": 0.3714890442,
        "ppp_absolute_scalar": 0.2857608032
      },
      "South Africa": {
        "ppp_relative_scalar": 0.5775106298,
        "ppp_absolute_scalar": 0.444238946
      },
      "Zambia": {
        "ppp_relative_scalar": 0.2675193087,
        "ppp_absolute_scalar": 0.2057840836
      },
      "Zimbabwe": {
        "ppp_relative_scalar": 0.760971975,
        "ppp_absolute_scalar": 0.5853630577
      },
       "NODATA_value": {
        "ppp_relative_scalar": 1,
        "ppp_absolute_scalar": 0.7692307692
      }
    };
  };

  global.getWorldBankSubdivisions = function () {
    //Declare local instance variables
    var countries_obj = {
      afghanistan: {
        colour: [100, 168, 255],
        name: "Afghanistan"
      },
      albania: {
        colour: [255, 71, 77],
        name: "Albania"
      },
      algeria: {
        colour: [100, 142, 69],
        name: "Algeria"
      },
      angola: {
        colour: [119, 81, 87],
        name: "Angola"
      },
      andorra: {
        colour: [200, 172, 131],
        name: "Andorra"
      },
      saint_kitts_and_nevis: {
        colour: [147, 18, 150],
        name: "St. Kitts and Nevis"
      },
      antigua_and_barbuda: {
        colour: [206, 130, 111],
        name: "Antigua and Barbuda"
      },
      argentina: {
        colour: [146, 179, 211],
        name: "Argentina"
      },
      armenia: {
        colour: [122, 87, 49],
        name: "Armenia"
      },
      australia: {
        colour: [74, 137, 84],
        name: "Australia"
      },
      austria: {
        colour: [201, 201, 201],
        name: "Austria"
      },
      azerbaijan: {
        colour: [123, 110, 160],
        name: "Azerbaijan"
      },
      bahamas: {
        colour: [22, 132, 91],
        name: "Bahamas, The"
      },
      bahrain: {
        colour: [209, 39, 39],
        name: "Bahrain"
      },
      bangladesh: {
        colour: [91, 173, 100],
        name: "Bangladesh"
      },
      barbados: {
        colour: [89, 56, 60],
        name: "Barbados"
      },
      belarus: {
        colour: [169, 201, 169],
        name: "Belarus"
      },
      belgium: {
        colour: [255, 237, 102],
        name: "Belgium"
      },
      belize: {
        colour: [157, 100, 95],
        name: "Belize"
      },
      benin: {
        colour: [165, 115, 109],
        name: "Benin"
      },
      bhutan: {
        colour: [155, 134, 122],
        name: "Bhutan"
      },
      bolivia: {
        colour: [124, 86, 44],
        name: "Bolivia"
      },
      bosnia_and_herzegovina: {
        colour: [84, 187, 135],
        name: "Bosnia and Herzegovina"
      },
      botswana: {
        colour: [134, 194, 204],
        name: "Botswana"
      },
      bulgaria: {
        colour: [84, 206, 97],
        name: "Bulgaria"
      },
      burkina_faso: {
        colour: [255, 142, 142],
        name: "Burkina Faso"
      },
      burma: {
        colour: [158, 131, 178],
        name: "Myanmar"
      },
      burundi: {
        colour: [103, 127, 153],
        name: "Burundi"
      },
      brazil: {
        colour: [109, 153, 88],
        name: "Brazil"
      },
      brunei: {
        colour: [82, 105, 142],
        name: "Brunei Darussalam"
      },
      cabo_verde: {
        colour: [94, 172, 0],
        name: "Cabo Verde"
      },
      cambodia: {
        colour: [58, 163, 119],
        name: "Cambodia"
      },
      cameroon: {
        colour: [175, 70, 114],
        name: "Cameroon"
      },
      canada: {
        colour: [175, 63, 76],
        name: "Canada"
      },
      central_african_republic: {
        colour: [73, 88, 160],
        name: "Central African Republic"
      },
      chad: {
        colour: [255, 207, 96],
        name: "Chad"
      },
      chile: {
        colour: [211, 158, 114],
        name: "Chile"
      },
      china: {
        colour: [173, 62, 62],
        name: "China"
      },
      colombia: {
        colour: [232, 206, 134],
        name: "Colombia"
      },
      comoros: {
        colour: [254, 188, 154],
        name: "Comoros"
      },
      congo: {
        colour: [154, 148, 0],
        name: "Congo, Rep."
      },
      costa_rica: {
        colour: [201, 162, 157],
        name: "Costa Rica"
      },
      croatia: {
        colour: [228, 175, 203],
        name: "Croatia"
      },
      cuba: {
        colour: [145, 79, 112],
        name: "Cuba"
      },
      cyprus: {
        colour: [130, 124, 67],
        name: "Cyprus"
      },
      czech_republic: {
        colour: [91, 140, 183],
        name: "Czechia"
      },
      denmark: {
        colour: [224, 71, 92],
        name: "Denmark"
      },
      djibouti: {
        colour: [78, 201, 140],
        name: "Djibouti"
      },
      dominica: {
        colour: [248, 146, 176],
        name: "Dominica"
      },
      dominican_republic: {
        colour: [175, 155, 109],
        name: "Dominican Republic"
      },
      dr_congo: {
        colour:  [47, 114, 142],
        name: "Congo, Dem. Rep."
      },
      east_timor: {
        colour: [66, 112, 65],
        name: "Timor-Leste"
      },
      ecuador: {
        colour: [211, 187, 80],
        name: "Ecuador"
      },
      egypt: {
        colour: [239, 188, 112],
        name: "Egypt, Arab Rep."
      },
      el_salvador: {
        colour: [91, 131, 169],
        name: "El Salvador"
      },
      equatorial_guinea: {
        colour: [249, 184, 76],
        name: "Equatorial Guinea"
      },
      eritrea: {
        colour: [123, 87, 142],
        name: "Eritrea"
      },
      estonia: {
        colour: [84, 150, 178],
        name: "Estonia"
      },
      ethiopia: {
        colour: [69, 108, 145],
        name: "Ethiopia"
      },
      finland: {
        colour: [190, 203, 206],
        name: "Finland"
      },
      france: {
        colour: [47, 97, 170],
        name: "France"
      },
      gabon: {
        colour: [74, 134, 1],
        name: "Gabon"
      },
      georgia: {
        colour: [193, 112, 112],
        name: "Georgia"
      },
      germany: {
        colour: [124, 124, 124],
        name: "Germany"
      },
      ghana: {
        colour: [218, 132, 0],
        name: "Ghana"
      },
      greece: {
        colour: [102, 191, 255],
        name: "Greece"
      },
      grenada: {
        colour: [50, 104, 23],
        name: "Grenada"
      },
      guatemala: {
        colour: [120, 107, 93],
        name: "Guatemala"
      },
      guinea: {
        colour: [0, 147, 147],
        name: "Guinea"
      },
      guinea_bissau: {
        colour: [91, 130, 86],
        name: "Guinea-Bissau"
      },
      guyana: {
        colour: [206, 142, 134],
        name: "Guyana"
      },
      haiti: {
        colour: [53, 60, 255],
        name: "Haiti"
      },
      honduras: {
        colour: [68, 117, 154],
        name: "Honduras"
      },
      hungary: {
        colour: [102, 175, 63],
        name: "Hungary"
      },
      iceland: {
        colour: [128, 149, 160],
        name: "Iceland"
      },
      india: {
        colour: [214, 144, 83],
        name: "India"
      },
      indonesia: {
        colour: [112, 113, 158],
        name: "Indonesia"
      },
      iran: {
        colour: [100, 168, 106],
        name: "Iran, Islamic Rep."
      },
      iraq: {
        colour: [198, 130, 129],
        name: "Iraq"
      },
      ireland: {
        colour: [88, 178, 53],
        name: "Ireland"
      },
      israel: {
        colour: [70, 124, 160],
        name: "Israel"
      },
      italy: {
        colour: [53, 206, 97],
        name: "Italy"
      },
      ivory_coast: {
        colour: [218, 132, 0],
        name: "Cote d'Ivoire"
      },
      jamaica: {
        colour: [89, 160, 86],
        name: "Jamaica"
      },
      jordan: {
        colour: [191, 116, 63],
        name: "Jordan"
      },
      kenya: {
        colour: [89, 117, 70],
        name: "Kenya"
      },
      liechtenstein: {
        colour: [6, 0, 246],
        name: "Liechtenstein"
      },
      laos: {
        colour: [198, 173, 97],
        name: "Lao PDR"
      },
      latvia: {
        colour: [206, 39, 53],
        name: "Latvia"
      },
      lebanon: {
        colour: [158, 69, 119],
        name: "Lebanon"
      },
      lesotho: {
        colour: [92, 84, 140],
        name: "Lesotho"
      },
      liberia: {
        colour: [131, 119, 122],
        name: "Liberia"
      },
      libya: {
        colour: [78, 188, 112],
        name: "Libya"
      },
      lithuania: {
        colour: [255, 203, 60],
        name: "Lithuania"
      },
      luxembourg: {
        colour: [0, 125, 255],
        name: "Luxembourg"
      },
      japan: {
        colour: [221, 122, 122],
        name: "Japan"
      },
      kazakhstan: {
        colour: [41, 193, 175],
        name: "Kazakhstan"
      },
      kosovo: {
        colour: [37, 103, 144],
        name: "Kosovo"
      },
      kuwait: {
        colour: [132, 166, 216],
        name: "Kuwait"
      },
      kyrgyzstan: {
        colour: [255, 97, 91],
        name: "Kyrgyz Republic"
      },
      macedonia: {
        colour: [193, 132, 89],
        name: "North Macedonia"
      },
      madagascar: {
        colour: [117, 150, 121],
        name: "Madagascar"
      },
      malawi: {
        colour: [142, 64, 74],
        name: "Malawi"
      },
      malaysia: {
        colour: [145, 117, 117],
        name: "Malaysia"
      },
      mali: {
        colour: [198, 147, 57],
        name: "Mali"
      },
      malta: {
        colour: [165, 108, 108],
        name: "Malta"
      },
      mauritania: {
        colour: [79, 163, 66],
        name: "Mauritania"
      },
      mauritius: {
        colour: [176, 163, 219],
        name: "Mauritius"
      },
      mexico: {
        colour: [71, 165, 101],
        name: "Mexico"
      },
      micronesia: {
        colour: [67, 1, 5],
        name: "Micronesia, Fed. Sts."
      },
      moldova: {
        colour: [168, 106, 97],
        name: "Moldova"
      },
      mongolia: {
        colour: [206, 137, 91],
        name: "Mongolia"
      },
      montenegro: {
        colour: [60, 67, 119],
        name: "Montenegro"
      },
      morocco: {
        colour: [214, 123, 107],
        name: "Morocco"
      },
      mozambique: {
        colour: [57, 130, 101],
        name: "Mozambique"
      },
      namibia: {
        colour: [175, 112, 149],
        name: "Namibia"
      },
      nepal: {
        colour: [191, 130, 140],
        name: "Nepal"
      },
      netherlands: {
        colour: [255, 125, 53],
        name: "Netherlands"
      },
      new_zealand: {
        colour: [183, 142, 91],
        name: "New Zealand"
      },
      nicaragua: {
        colour: [150, 168, 202],
        name: "Nicaragua"
      },
      niger: {
        colour: [198, 96, 49],
        name: "Niger"
      },
      nigeria: {
        colour: [0, 109, 54],
        name: "Nigeria"
      },
      north_korea: {
        colour: [165, 108, 160],
        name: "Korea, Dem. People's Rep."
      },
      norway: {
        colour: [159, 203, 206],
        name: "Norway"
      },
      oman: {
        colour: [89, 130, 94],
        name: "Oman"
      },
      palestine: {
        colour: [80, 170, 122],
        name: "West Bank and Gaza"
      },
      pakistan: {
        colour: [22, 144, 83],
        name: "Pakistan"
      },
      palau: {
        colour: [134, 222, 0],
        name: "Palau"
      },
      panama: {
        colour: [174, 166, 209],
        name: "Panama"
      },
      papua_new_guinea: {
        colour: [119, 117, 214],
        name: "Papua New Guinea"
      },
      paraguay: {
        colour: [77, 151, 204],
        name: "Paraguay"
      },
      peru: {
        colour: [186, 80, 80],
        name: "Peru"
      },
      philippines: {
        colour: [214, 181, 89],
        name: "Philippines"
      },
      poland: {
        colour: [211, 146, 146],
        name: "Poland"
      },
      portugal: {
        colour: [0, 184, 63],
        name: "Portugal"
      },
      qatar: {
        colour: [165, 100, 178],
        name: "Qatar"
      },
      romania: {
        colour: [215, 206, 97],
        name: "Romania"
      },
      russia: {
        colour: [20, 114, 30],
        name: "Russian Federation"
      },
      rwanda: {
        colour: [103, 127, 103],
        name: "Rwanda"
      },
      saint_lucia: {
        colour: [242, 223, 145],
        name: "St. Lucia"
      },
      saint_vincent_and_the_grenadines: {
        colour: [89, 56, 112],
        name: "St. Vincent and the Grenadines"
      },
      sao_tome_and_principe: {
        colour: [193, 81, 81],
        name: "Sao Tome and Principe"
      },
      samoa: {
        colour: [9, 181, 255],
        name: "Samoa"
      },
      saudi_arabia: {
        colour: [33, 153, 73],
        name: "Saudi Arabia"
      },
      senegal: {
        colour: [30, 117, 105],
        name: "Senegal"
      },
      serbia: {
        colour: [58, 83, 135],
        name: "Serbia"
      },
      sierra_leone: {
        colour: [83, 209, 85],
        name: "Sierra Leone"
      },
      singapore: {
        colour: [30, 207, 3],
        name: "Singapore"
      },
      slovakia: {
        colour: [124, 97, 183],
        name: "Slovak Republic"
      },
      slovenia: {
        colour: [84, 78, 135],
        name: "Slovenia"
      },
      solomon_islands: {
        colour: [240, 97, 101],
        name: "Solomon Islands"
      },
      somalia: {
        colour: [75, 171, 204],
        name: "Somalia"
      },
      somaliland: {
        colour: [118, 178, 204],
        name: "Somalia"
      },
      south_africa: {
        colour: [153, 119, 100],
        name: "South Africa"
      },
      south_korea: {
        colour: [69, 184, 215],
        name: "Korea, Rep."
      },
      south_sudan: {
        colour: [122, 125, 112],
        name: "South Sudan"
      },
      spain: {
        colour: [255, 246, 68],
        name: "Spain"
      },
      sri_lanka: {
        colour: [134, 131, 100],
        name: "Sri Lanka"
      },
      sudan: {
        colour: [155, 101, 77],
        name: "Sudan"
      },
      suriname: {
        colour: [198, 104, 75],
        name: "Suriname"
      },
      swaziland: {
        colour: [74, 103, 140],
        name: "Eswatini"
      },
      sweden: {
        colour: [119, 168, 200],
        name: "Sweden"
      },
      switzerland: {
        colour: [214, 75, 97],
        name: "Switzerland"
      },
      syria: {
        colour: [98, 112, 137],
        name: "Syrian Arab Republic"
      },
      taiwan: {
        colour: [45, 68, 99],
        name: "China"
      },
      tajikistan: {
        colour: [110, 173, 130],
        name: "Tajikistan"
      },
      tanzania: {
        colour: [132, 173, 140],
        name: "Tanzania"
      },
      thailand: {
        colour: [97, 144, 163],
        name: "Thailand"
      },
      the_gambia: {
        colour: [252, 105, 71],
        name: "Gambia, The"
      },
      togo: {
        colour: [90, 119, 127],
        name: "Togo"
      },
      trinidad_and_tobago: {
        colour: [150, 112, 94],
        name: "Trinidad and Tobago"
      },
      tunisia: {
        colour: [226, 184, 168],
        name: "Tunisia"
      },
      turkey: {
        colour: [191, 72, 72],
        name: "Turkiye"
      },
      turkmenistan: {
        colour: [188, 123, 103],
        name: "Turkmenistan"
      },
      uganda: {
        colour: [103, 93, 63],
        name: "Uganda"
      },
      ukraine: {
        colour: [97, 150, 175],
        name: "Ukraine"
      },
      united_arab_emirates: {
        colour: [162, 140, 91],
        name: "United Arab Emirates"
      },
      united_kingdom: {
        colour: [198, 69, 69],
        name: "United Kingdom"
      },
      united_states: {
        colour: [87, 122, 175],
        name: "United States"
      },
      uruguay: {
        colour: [93, 127, 90],
        name: "Uruguay"
      },
      uzbekistan: {
        colour: [187, 193, 97],
        name: "Uzbekistan"
      },
      vanuatu: {
        colour: [0, 205, 143],
        name: "Vanuatu"
      },
      venezuela: {
        colour: [198, 71, 111],
        name: "Venezuela, RB"
      },
      vietnam: {
        colour: [178, 94, 100],
        name: "Viet Nam"
      },
      western_sahara: {
        colour: [193, 155, 155],
        name: "Morocco"
      },
      yemen: {
        colour: [188, 136, 122],
        name: "Yemen, Rep."
      },
      zambia: {
        colour: [103, 100, 84],
        name: "Zambia"
      },
      zimbabwe: {
        colour: [201, 107, 109],
        name: "Zimbabwe"
      },
      NODATA_value: {
        name: "NODATA_value"
      }
    };
    var maddison_obj = getMaddisonSubdivisions();
    var ppp_scalar_obj = getWorldBankPPPScalars();

    //Iterate over all_countries_keys and input ppp_relative_scalar and ppp_absolute_scalar for each country
    var all_countries_keys = Object.keys(countries_obj);
    var all_maddison_keys = Object.keys(maddison_obj);

    for (var i = 0; i < all_countries_keys.length; i++) {
      var local_value = countries_obj[all_countries_keys[i]];

      //Maddison data
      for (var x = 0; x < all_maddison_keys.length; x++) {
        var local_maddison_obj = maddison_obj[all_maddison_keys[x]];

        if (local_maddison_obj.id == all_countries_keys[i])
          local_value.maddison_name = local_maddison_obj.name;
      }
      if (!local_value.maddison_name)
        console.warn(`getWorldBankSubdivisions(): ${all_countries_keys[i]} (${local_value.name}) does not have a valid Maddison name.`);

      //World Bank data
      if (local_value.name) {
        var local_ppp_scalar_obj = ppp_scalar_obj[local_value.name];

        if (local_ppp_scalar_obj) {
          local_value.ppp_absolute_scalar = returnSafeNumber(local_ppp_scalar_obj.ppp_absolute_scalar);
          local_value.ppp_relative_scalar = returnSafeNumber(local_ppp_scalar_obj.ppp_relative_scalar);
        } else {
          var default_scalar_obj = ppp_scalar_obj.NODATA_value;
          local_value.ppp_absolute_scalar = default_scalar_obj.ppp_absolute_scalar;
          local_value.ppp_relative_scalar = default_scalar_obj.ppp_relative_scalar;

          console.warn(`getWorldBankSubdivisions(): ${all_countries_keys[i]} (${local_value.name}) does not have a valid equivalent in getWorldBankPPPScalars().`);
        }
      } else {
        console.error(`getWorldBankSubdivisions(): ${all_countries_keys[i]} has no name!`);
      }

      //Populate Maddison GDP (PPP) estimates, 2000$
      local_value.gdp_ppp = getGDPPPP(local_value);
    }

    //Iterate over all_countries_keys to add colour aliases
    for (var i = 0; i < all_countries_keys.length; i++) {
      var local_value = countries_obj[all_countries_keys[i]];

      if (local_value.colour)
        countries_obj[local_value.colour.join(",")] = countries_obj[all_countries_keys[i]];
    }

    //Return statement
    return countries_obj;
  };

  global.loadWorldBankSubdivisions = function (arg0_image_path) {
    //Convert from parameters
    var image_path = arg0_image_path;

    //Declare local instance variables
    var world_bank_subdivisions_rawdata = fs.readFileSync(image_path);

    //Set main.countries_obj
    if (!main.countries)
      main.countries = getWorldBankSubdivisions();

    //Return statement
    return pngjs.PNG.sync.read(world_bank_subdivisions_rawdata);
  }
}
