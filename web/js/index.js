function clearInp() {
  document.getElementById("myForm").reset();
}

const isNumericInput = (event) => {
  const key = event.keyCode;
  return (
    (key >= 48 && key <= 57) || // Allow number line
    (key >= 96 && key <= 105) // Allow number pad
  );
};

const isModifierKey = (event) => {
  const key = event.keyCode;
  return (
    event.shiftKey === true ||
    key === 35 ||
    key === 36 || // Allow Shift, Home, End
    key === 8 ||
    key === 9 ||
    key === 13 ||
    key === 46 || // Allow Backspace, Tab, Enter, Delete
    (key > 36 && key < 41) || // Allow left, up, right, down
    // Allow Ctrl/Command + A,C,V,X,Z
    ((event.ctrlKey === true || event.metaKey === true) &&
      (key === 65 || key === 67 || key === 86 || key === 88 || key === 90))
  );
};

const enforceFormat = (event) => {
  // Input must be of a valid number format or a modifier key, and not longer than ten digits
  if (!isNumericInput(event) && !isModifierKey(event)) {
    event.preventDefault();
  }
};

const formatToPhone = (event) => {
  if (isModifierKey(event)) {
    return;
  }

  const input = event.target.value.replace(/\D/g, "").substring(0, 10); // First ten digits of input only
  const areaCode = input.substring(0, 3);
  const middle = input.substring(3, 6);
  const last = input.substring(6, 10);

  if (input.length > 6) {
    event.target.value = `(${areaCode})${middle}-${last}`;
  } else if (input.length > 3) {
    event.target.value = `(${areaCode})${middle}`;
  } else if (input.length > 0) {
    event.target.value = `(${areaCode}`;
  }
};

const inputElement = document.getElementById("phoneNumber");
inputElement.addEventListener("keydown", enforceFormat);
inputElement.addEventListener("keyup", formatToPhone);

function checkFields() {
  var token = localStorage.getItem("token");
  var cooler = document.getElementById("cooler").value;
  var ice = document.getElementById("icetype").value;
  var neighborhood = document.getElementById("neighborhoodselect").value;
  var address = document.getElementById("address").value;
  var name = document.getElementById("name").value;
  var phone = document.getElementById("phoneNumber").value;
  var email = document.getElementById("email").value;
  var start_date = document.getElementById("startdate").value;
  var end_date = document.getElementById("enddate").value;
  var special = document.getElementById("special").value;
  if (special == null) {
    special = "";
  }

  if (
    (cooler === "") |
    (ice === "") |
    (neighborhood === "") |
    (address === "") |
    (name === "") |
    (phone === "") |
    (start_date === "") |
    (end_date === "")
  ) {
    alert("Please fill out all fields");
  } else {
    var addDeliveryURL = `https://ice-delivery.fly.dev/api/delivery/add`;
    fetch(addDeliveryURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({
        delivery_address: address,
        customer_name: name,
        customer_phone: phone,
        customer_email: email,
        start_date: start_date.slice(0, 10),
        end_date: end_date.slice(0, 10),
        special_instructions: special,
        cooler_size: cooler,
        ice_type: ice,
        neighborhood: neighborhood,
      }),
    }).then((response) => {
      if (response.status == 200) {
        alert("Reservation successfully added!");
      } else {
        alert("Something went wrong. Please try again");
      }
    });
  }
}

const sectionA = ["OCEANWAY", "BREAKERSARCH"];

const sectionB = ["SEASHELLLN", "CONCHCRES"];

const sectionC = ["SANDHILLLN", "SANDBUCKETARCH", "SANDBUCKET"];

const sectionD = [
  "MARLINWAY",
  "TROLLINGLN",
  "TROLLINGLANE",
  "WHITEWHALEWAY",
  "PORPOISEPT",
  "PORPOISEPOINT",
];

const sectionE = [
  "SCHOONERRIDGEDR",
  "SCHOONERRIDGEDRIVE",
  "STAYSAILCRES",
  "STAYSAILCRESCENT",
  "MAINSAILLN",
  "MAINSAILLANE",
  "TOPSAILARCH",
  "SCHOONERRIDGE",
];

const sectionF = [
  "SANDFIDDLERTRAIL",
  "SANDFIDDLERTR",
  "SURFSONGLN",
  "SURFSONGLANE",
  "SEAOATSCT",
  "SEAOATSCOURT",
  "SALTSPRAYCT",
  "SALTSPRAYCOURT",
  "SURFSONGCT",
  "SURFSONGCOURT",
  "SALTSPRAYCIR",
  "SALTSPRAYCIRCLE",
  "SANDFIDDLERCIR",
  "SANDFIDDLERCIRCLE",
];

const hijo = [
  "SEABIRDWAY",
  "CORMORANTTRAIL",
  "CORMORANTTR",
  "WWILLETCT",
  "WWILLETCOURT",
  "EWILLETCT",
  "EWILLETCOURT",
  "WGRACKLECT",
  "WGRACKLECOURT",
  "EGRACKLECT",
  "EGRACKLECOURT",
  "WKNOTCT",
  "WKNOTCOURT",
  "WKNOT",
  "EKNOTCT",
  "EKNOTCOURT",
  "EKNOT",
  "CORMORANTCT",
  "CORMORANTCOURT",
  "SANDERLINGTRAIL",
  "SANDERLINGTR",
  "SKIMMERCT",
  "SKIMMERCOURT",
  "SKIMMERARCH",
  "GREBECT",
  "GREBECOURT",
  "GANNETCT",
  "GANNETCOURT",
  "TERNCT",
  "TERNCOURT",
  "TERNARCH",
  "OCEANFRONTARCH",
  "OCEANLAKETRAIL",
  "OCEANLAKETR",
  "MYRTLEWOODCT",
  "MYRTLEWOODCOURT",
  "SANDPLUMCT",
  "SANDPLUMCOURT",
  "WAVEARCH",
  "OLEANDERCT",
  "OLEANDERCOURT",
  "JUNIPERBERRYCT",
  "JUNIPERBERRYCOURT",
  "TIDEARCH",
  "PAMPASCT",
  "PAMPASCOURT",
  "WPLOVERCT",
  "WPLOVERCOURT",
  "EPLOVERCT",
  "EPLOVERCOURT",
  "WSANDPIPERCT",
  "WSANDPIPERCOURT",
  "ESANDPIPERCT",
  "ESANDPIPERCOURT",
  "FISHCROWCT",
  "FISHCROWCOURT",
];

const klmpq = [
  "DRIFTWOODWAY",
  "SUNRISELN",
  "SUNRISELANE",
  "GULFSTREAMCT",
  "GULFSTREAMCOURT",
  "FISHERMANSCT",
  "FISHERMANSCOURT",
  "LAKEVIEWCT",
  "LAKEVIEWCOURT",
  "LAKESHORECT",
  "LAKESHORECOURT",
  "SEAHORSECT",
  "SEAHORSECOURT",
  "WATERSEDGE",
  "MARINERDR",
  "MARINERDRIVE",
  "MAINSAILARCH",
  "SPINNAKERARCH",
  "SEAMISTLN",
  "SEAMISTLANE",
  "SANDDOLLARCT",
  "SANDDOLLARCOURT",
  "STARFISHCT",
  "STARFISHCOURT",
  "SEAMISTCT",
  "SEAMISTCOURT",
  "MYRTLECT",
  "MYRTLECOURT",
  "BAYBERRYCT",
  "BAYBERRYCOURT",
  "SUNRISECT",
  "SUNRISECOURT",
];

const crownPoint = [
  "CROWNPOINTCIR",
  "CROWNPOINTCIRCLE",
  "KINGSGRANTDR",
  "KINGSGRANTDRIVE",
];

const spinDrift = [
  "SPINDRIFTTRAIL",
  "CLAMSHELLCT",
  "CLAMSHELLCOURT",
  "LANDFALLCT",
  "LANDFALLCOURT",
];

const pineIsland = [
  "CADWALLRD",
  "CADWALLROAD",
  "SALTHOUSERD",
  "SALTHOUSEROAD",
  "COTTAGECOVE",
  "HICKSBAYLN",
  "HICKSBAYLANE",
  "LONGFELLOWCOVE",
  "WHITEPT",
  "WHITEPOINT",
  "AUDUBONLN",
  "AUDUBONLANE",
  "LINDSEYLN",
  "LINDSEYLANE",
  "DEEPNECKRD",
  "DEEPNECKROAD",
  "MYRTLEPONDRD",
  "MYRTLEPONDROAD",
  "SPRIGPT",
  "SPRIGPOINT",
  "KITSYSPOND",
  "BLACKPINERD",
  "BLACKPINEROAD",
  "NCOVERD",
  "NCOVEROAD",
  "ISLANDLEADRD",
  "ISLANDLEADROAD",
  "PIPSISPOINTRD",
  "PIPSISPOINTROAD",
  "PIPSISPTROAD",
  "PIPSISPTRD",
  "PIPSISPT",
  "PIPSISPOINT",
  "GREATGAPPOINT",
  "GREATGAPPT",
  "COTTAGECOVERD",
  "COTTAGECOVEROAD",
  "NBAUMTRAIL",
  "NBAUMTR",
  "SBAUMTRAIL",
  "SBAUMTR",
  "BALLASTPOINT",
  "BALLASTPT",
];

const buckIsland = [
  "ORIONSWAY",
  "RANGERRD",
  "RANGERROAD",
  "WMEETINGST",
  "WMEETINGSTREET",
  "BROADST",
  "BROADSTREET",
  "APOLLORD",
  "APOLLOROAD",
  "MERCURCYRD",
  "MERCURCYROAD",
  "COLUMBIARD",
  "COLUMBIAROAD",
  "GALILEORD",
  "GALILEOROAD",
  "VOYAGERRD",
  "VOYAGERROAD",
  "EMEETINGST",
  "EMEETINGSTREET",
];

const oceanHill = [
  "SANDCASTLEDR",
  "SANDCASTLEDRIVE",
  "STILLWINDCT",
  "STILLWINDCOURT",
  "BEARFOOTPATH",
  "LOSTLAKELN",
  "LOSTLAKELANE",
  "LAKESIDEDR",
  "LAKESIDEDRIVE",
  "CRYSTALLAKECT",
  "CRYSTALLAKECOURT",
  "FAIRWINDSLN",
  "FAIRWINDSLANE",
  "OCEANHILLCT",
  "OCEANHILLCOURT",
  "BLUEWATERCT",
  "BLUEWATERCOURT",
  "CLEARWATERLN",
  "CLEARWATERLANE",
  "STILLWATERCT",
  "STILLWATERCOURT",
  "NLAKECT",
  "NLAKECOURT",
  "WINDANCELN",
  "WINDANCELANE",
  "HOMEPORTCTW",
  "HOMEPORTCTE",
  "FOURWINDSCT",
  "FOURWINDSCOURT",
  "WINDJAMMERCT",
  "WINDJAMMERCOURT",
  "CORALLN",
  "CORALLANE",
  "PACIFICAVE",
  "BISMARKDR",
  "BISMARKDRIVE",
  "ATLANTICAVE",
  "IONIANLN",
  "IONIANLANE",
  "ADRIATICAVE",
  "PERSIMMONST",
  "PERSIMMONSTREET",
  "SCHOOLHOUSELN",
  "SCHOOLHOUSELANE",
  "KARENSWAY",
  "THIRDST",
  "THIRDSTREET",
];

const corollaLight = [
  "MORRISDR",
  "MORRISDRIVE",
  "FRANKLYNST",
  "FRANKLYNSTREET",
  "PAYSONST",
  "PAYSONSTREET",
  "PAYSONCT",
  "PAYSONCOURT",
  "BALDWINCT",
  "BALDWINCOURT",
  "FRANKLYNCT",
  "FRANKLYNCOURT",
  "STRONGCT",
  "STRONGCOURT",
  "VILLACT",
  "VILLACOURT",
  "TWIFORDST",
  "TWIFORDSTREET",
  "GRAYCT",
  "GRAYCOURT",
  "BODIECT",
  "BODIECOURT",
  "HATTERASCT",
  "HATTERASCOURT",
  "ALBERMARLECT",
  "ALBERMARLECOURT",
  "OCRACOKECT",
  "OCRACOKECOURT",
  "AUSTINST",
  "AUSTINSTREET",
  "DUNTONCT",
  "DUNTONCOURT",
  "BRUMSEYCT",
  "BRUMSEYCOURT",
  "SIMMONSCT",
  "SIMMONSCOURT",
  "SNOWCT",
  "SNOWCOURT",
];

const cruzBay = ["CRUZBAYLN", "CRUZBAYLANE", "DEVILSBAY"];

const whalehead = [
  "SHADST",
  "SHADSTREET",
  "COROLLADR",
  "CRLDR",
  "COROLLADRIVE",
  "WHALEHEADDR",
  "WHDR",
  "WHALEHEADDRIVE",
  "LIGHTHOUSEDR",
  "LTDR",
  "LIGHTHOUSEDRIVE",
  "DOLPHINST",
  "DOLPHINSTREET",
  "ALBACOREST",
  "ALBACORESTREET",
];

const whaleheadRight = [
  "HERRINGST",
  "HERRINGSTREET",
  "CANEGARDENBAYCIR",
  "CANEGARDENBAYCIRCLE",
  "PELICANCT",
  "PELICANCOURT",
  "NHARBORVIEW",
  "SEAVIEWCT",
  "SEAVIEWCOURT",
  "MIRAGEST",
  "MIRAGE",
  "SUNSETCRES",
];

const monterayShores = [
  "OCEANFORESTCT",
  "OCEANFORESTCOURT",
  "MISTYPONDCT",
  "MISTYPONDCOURT",
  "SUNBURSTCT",
  "SUNBURSTCOURT",
  "SHARBORVIEW",
  "MARINACT",
  "MARINACOURT",
  "MONTERAYDR",
  "MONTERAYDRIVE",
  "CINNAMONCT",
  "CINNAMONCOURT",
  "SEAWHISPERCT",
  "SEAWHISPERCOURT",
  "WINDWARDWAY",
  "LOOKOUTWAY",
  "SEASCAPECT",
  "SEASCAPECOURT",
  "SEACLIFFCT",
  "SEACLIFFCOURT",
  "SEADRIFTCT",
  "SEADRIFTCOURT",
  "DRIFTINGSANDSDR",
  "DRIFTINGSANDSDRIVE",
  "SPYGLASSCT",
  "SPYGLASSCOURT",
  "GOLDENBLUFFWAY",
  "WINDSWEPTCT",
  "WINDSWEPTCOURT",
  "SPOINTCT",
  "SPOINTCOURT",
  "ROSEWOODCT",
  "ROSEWOODCOURT",
  "AZURECT",
  "AZURECOURT",
  "OAKRIDGECT",
  "OAKRIDGECOURT",
  "IVORYCT",
  "IVORYCOURT",
  "WELKCT",
  "WELKCOURT",
  "MARSHLANDING",
  "SEARIDGEDR",
  "SEARIDGEDRIVE",
  "AMBERCT",
  "AMBERCOURT",
  "SHORESIDECT",
  "SHORESIDECOURT",
  "INDIGOCT",
  "INDIGOCOURT",
  "EMERALDCT",
  "EMERALDCOURT",
];

const currituckClub = [
  "COTTAGE LN",
  "COTTAGE LANE",
  "SANDANDSEACT",
  "SANDANDSEACOURT",
  "LOBLOLLYCT",
  "LOBLOLLYCOURT",
  "HIGHSANDDUNECT",
  "HIGHSANDDUNECOURT",
  "OYSTERCATCHERCT",
  "OYSTERCATCHERCOURT",
  "SHOVLERCT",
  "SHOVLERCOURT",
  "WILDCHERRYCT",
  "WILDCHERRYCOURT",
  "DOTTIESWALK",
  "TERRAPINPONDCT",
  "TERRAPINPONDCOURT",
  "SEAFAIRDR",
  "SEAFAIRDRIVE",
  "DUNEPOINTRD",
  "DUNEPOINTROAD",
  "DUNEPT",
  "DUNEPOINT",
  "RIDGEPOINTDR",
  "RIDGEPOINTDRIVE",
  "RIDGEPT",
  "RIDGEPOINT",
  "HAMMOCKLN",
  "HAMMOCKLANE",
  "CURRITUCKCAY",
  "MOONGATELN",
  "MOONGATELANE",
  "GROUSECT",
  "GROUSECOURT",
  "WHISTLERCT",
  "WHISTLERCOURT",
  "HUNTCLUBDR",
  "HUNTCLUBDRIVE",
  "OAKVIEWCT",
  "OAKVIEWCOURT",
  "MEADOWLN",
  "MEADOWLANE",
  "MAGNOLIAWAY",
  "MAGNOLIACT",
  "MAGNOLIACOURT",
  "BROWNPELICANCT",
  "BROWNPELICANCOURT",
  "NIGHTHERONCT",
  "NIGHTHERONCOURT",
  "WHOOPINGCRANECT",
  "WHOOPINGCRANECOURT",
  "OLDSANDYRD",
  "OLDSANDYROAD",
  "HISTORICLOOP",
  "BARNCT",
  "BARNCOURT",
  "TRUMPETERSWANCT",
  "TRUMPETERSWANCOURT",
  "LIVEOAKCT",
  "LIVEOAKCOURT",
  "GOLFVIEWTRAIL",
  "HERRINGGULLCT",
  "HERRINGGULLCOURT",
  "LAUGHINGGULLCT",
  "LAUGHINGGULLCOURT",
];

const checkNeighborhood = (address) => {
  address = address.replace(/[^a-zA-Z]/g, "").toUpperCase();
  console.log("Checking neighborhood for address:", address);

  let neighborhoodSelect = document.getElementById("neighborhoodselect");

  if (sectionA.includes(address)) {
    neighborhoodSelect.value = "7";
  } else if (sectionB.includes(address)) {
    neighborhoodSelect.value = "8";
  } else if (sectionC.includes(address)) {
    neighborhoodSelect.value = "9";
  } else if (sectionD.includes(address)) {
    neighborhoodSelect.value = "10";
  } else if (sectionE.includes(address)) {
    neighborhoodSelect.value = "11";
  } else if (sectionF.includes(address)) {
    neighborhoodSelect.value = "12";
  } else if (hijo.includes(address)) {
    neighborhoodSelect.value = "13";
  } else if (klmpq.includes(address)) {
    neighborhoodSelect.value = "14";
  } else if (crownPoint.includes(address)) {
    neighborhoodSelect.value = "15";
  } else if (spinDrift.includes(address)) {
    neighborhoodSelect.value = "6";
  } else if (pineIsland.includes(address)) {
    neighborhoodSelect.value = "5";
  } else if (buckIsland.includes(address)) {
    neighborhoodSelect.value = "16";
  } else if (oceanHill.includes(address)) {
    neighborhoodSelect.value = "1";
  } else if (corollaLight.includes(address)) {
    neighborhoodSelect.value = "2";
  } else if (cruzBay.includes(address)) {
    neighborhoodSelect.value = "19";
  } else if (whalehead.includes(address)) {
    neighborhoodSelect.value = "3";
  } else if (whaleheadRight.includes(address)) {
    neighborhoodSelect.value = "18";
  } else if (monterayShores.includes(address)) {
    neighborhoodSelect.value = "17";
  } else if (currituckClub.includes(address)) {
    neighborhoodSelect.value = "4";
  }
};
