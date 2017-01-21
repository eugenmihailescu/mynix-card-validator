// valid postal codes length by country
// http://www.upu.int/uploads/tx_sbdownloader/manualAddressingKnowledgeCentreGeneralIssuesEn.pdf
var PostalCodesLength = (function() {
    return {
        consts : {
            MIN_POSTAL_CODE_LENGTH : 3,
            MAX_POSTAL_CODE_LENGTH : 10
        },
        codes : {
            "AF" : [ "Afghanistan", 4 ],
            "GL" : [ "Greenland", 4 ],
            "NO" : [ "Norway", 4 ],
            "DZ" : [ "Algeria", 5 ],
            "GP" : [ "Guadeloupe", 5 ],
            "OM" : [ "Oman", 3 ],
            "AD" : [ "Andorra", 5 ],
            "GT" : [ "Guatemala", 5 ],
            "PK" : [ "Pakistan", 5 ],
            "AR" : [ "Argentina", 5 ],
            "GN" : [ "Guinea", 3 ],
            "PG" : [ "Papua New Guinea", 3 ],
            "AM" : [ "Armenia", 4 ],
            "GW" : [ "Guinea-Bissau", 4 ],
            "PY" : [ "Paraguay", 4 ],
            "HT" : [ "Haiti", 4 ],
            "PE" : [ "Peru", 5 ],
            "AU" : [ "Australia", 4 ],
            "HN" : [ "Honduras", 6 ],
            "PH" : [ "Philippines", 4 ],
            "AT" : [ "Austria", 4 ],
            "HU" : [ "Hungary", 4 ],
            "PN" : [ "Pitcairn", 8 ],
            "AZ" : [ "Azerbaijan", 7 ],
            "IS" : [ "Iceland", 3 ],
            "PL" : [ "Poland", 6 ],
            "BH" : [ "Bahrain", 4 ],
            "IN" : [ "India", 6 ],
            "PT" : [ "Portugal", 8 ],
            "ID" : [ "Indonesia", 5 ],
            "RO" : [ "Romania", 6 ],
            "BD" : [ "Bangladesh", 4 ],
            "IR" : [ "Iran", 6 ],
            "RU" : [ "Russia", 6 ],
            "BB" : [ "Barbados", 7 ],
            "IQ" : [ "Iraq", 5 ],
            "RE" : [ "Reunion", 5 ],
            "BY" : [ "Belarus", 6 ],
            "IL" : [ "Israel", 5 ],
            "GS" : [ "South Georgia/Sandwich Islands", 8 ],
            "BE" : [ "Belgium", 4 ],
            "IT" : [ "Italy", 5 ],
            "BL" : [ "Saint Barthélemy", 5 ],
            "BM" : [ "Bermuda", 5 ],
            "JP" : [ "Japan", 8 ],
            "SH" : [ "Saint Helena", 8 ],
            "BT" : [ "Bhutan", 5 ],
            "JO" : [ "Jordan", 5 ],
            "MF" : [ "Saint Martin (French part)", 5 ],
            "BA" : [ "Bosnia and Herzegovina", 5 ],
            "KZ" : [ "Kazakhstan", 6 ],
            "PM" : [ "Saint Pierre and Miquelon", 5 ],
            "KE" : [ "Kenya", 5 ],
            "WS" : [ "Samoa", 6 ],
            "BR" : [ "Brazil", 9 ],
            "KR" : [ "South Korea", 5 ],
            "SM" : [ "San Marino", 5 ],
            "SA" : [ "Saudi Arabia", 5 ],
            "BN" : [ "Brunei", 6 ],
            "KW" : [ "Kuwait", 5 ],
            "SN" : [ "Senegal", 5 ],
            "BG" : [ "Bulgaria", 4 ],
            "KG" : [ "Kyrgyzstan", 6 ],
            "RS" : [ "Serbia", 6 ],
            "CV" : [ "Cape Verde", 4 ],
            "LA" : [ "Laos", 5 ],
            "KH" : [ "Cambodia", 5 ],
            "LV" : [ "Latvia", 7 ],
            "SG" : [ "Singapore", 6 ],
            "CA" : [ "Canada", 7 ],
            "LB" : [ "Lebanon", 9 ],
            "SK" : [ "Slovakia", 6 ],
            "KY" : [ "Cayman Islands", 8 ],
            "SI" : [ "Slovenia", 4 ],
            "CL" : [ "Chile", 7 ],
            "LS" : [ "Lesotho", 3 ],
            "ZA" : [ "South Africa", 4 ],
            "CN" : [ "China", 6 ],
            "LI" : [ "Liechtenstein", 4 ],
            "ES" : [ "Spain", 5 ],
            "CX" : [ "Christmas Island", 4 ],
            "LT" : [ "Lithuania", 5 ],
            "LK" : [ "Sri Lanka", 5 ],
            "LU" : [ "Luxembourg", 6 ],
            "MK" : [ "Macedonia", 4 ],
            "SD" : [ "Sudan", 5 ],
            "CR" : [ "Costa Rica", 5 ],
            "MG" : [ "Madagascar", 3 ],
            "SJ" : [ "Svalbard and Jan Mayen", 4 ],
            "HR" : [ "Croatia", 5 ],
            "MY" : [ "Malaysia", 5 ],
            "SZ" : [ "Swaziland", 4 ],
            "CU" : [ "Cuba", 5 ],
            "MV" : [ "Maldives", 5 ],
            "SE" : [ "Sweden", 6 ],
            "CY" : [ "Cyprus", 4 ],
            "MT" : [ "Malta", 8 ],
            "CH" : [ "Switzerland", 4 ],
            "CZ" : [ "Czech Republic", 6 ],
            "TW" : [ "Taiwan", 5 ],
            "DK" : [ "Denmark", 4 ],
            "TJ" : [ "Tajikistan", 6 ],
            "MQ" : [ "Martinique", 5 ],
            "TZ" : [ "Tanzania", 5 ],
            "DO" : [ "Dominican Republic", 5 ],
            "YT" : [ "Mayotte", 5 ],
            "TH" : [ "Thailand", 5 ],
            "EC" : [ "Ecuador", 6 ],
            "MX" : [ "Mexico", 5 ],
            "TT" : [ "Trinidad and Tobago", 6 ],
            "EG" : [ "Egypt", 5 ],
            "MD" : [ "Moldova", 4 ],
            "SV" : [ "El Salvador", 4 ],
            "MC" : [ "Monaco", 5 ],
            "TN" : [ "Tunisia", 4 ],
            "EE" : [ "Estonia", 5 ],
            "MN" : [ "Mongolia", 5 ],
            "TR" : [ "Turkey", 5 ],
            "ET" : [ "Ethiopia", 4 ],
            "ME" : [ "Montenegro", 5 ],
            "TM" : [ "Turkmenistan", 6 ],
            "FK" : [ "Falkland Islands", 8 ],
            "MS" : [ "Montserrat", 7 ],
            "FO" : [ "Faroe Islands", 3 ],
            "MA" : [ "Morocco", 5 ],
            "US" : [ "United States (US)", 5 ],
            "FI" : [ "Finland", 5 ],
            "FR" : [ "France", 5 ],
            "MZ" : [ "Mozambique", 4 ],
            "UA" : [ "Ukraine", 5 ],
            "GF" : [ "French Guiana", 5 ],
            "NP" : [ "Nepal", 5 ],
            "UY" : [ "Uruguay", 5 ],
            "PF" : [ "French Polynesia", 5 ],
            "NL" : [ "Netherlands", 7 ],
            "UZ" : [ "Uzbekistan", 6 ],
            "GE" : [ "Georgia", 4 ],
            "VA" : [ "Vatican", 5 ],
            "DE" : [ "Germany", 5 ],
            "NC" : [ "New Caledonia", 5 ],
            "VE" : [ "Venezuela", 6 ],
            "GI" : [ "Gibraltar", 8 ],
            "NZ" : [ "New Zealand", 4 ],
            "GB" : [ "United Kingdom (UK)", 8 ],
            "NI" : [ "Nicaragua", 5 ],
            "VN" : [ "Vietnam", 6 ],
            "NE" : [ "Niger", 4 ],
            "VG" : [ "British Virgin Islands", 6 ],
            "NG" : [ "Nigeria", 6 ],
            "WF" : [ "Wallis and Futuna", 5 ],
            "GR" : [ "Greece", 6 ],
            "NF" : [ "Norfolk Island", 4 ],
            "AX" : [ "Åland Islands", 5 ]
        }
    };
})();