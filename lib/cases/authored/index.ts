// Registry of cases written by the conversion agents (see .claude/skills/convert-case).
// One file per case lives in this folder; each exports CASE_ID, CASE_META and PAGES.
// To register a case, add one import under REGISTER-IMPORTS and the module name to the
// array under REGISTER-ENTRIES (keep both lists alphabetical by file name).
// CASE_META.review is "auto" for agent-generated cases nobody has checked yet, and
// "confirmed" once the owner has reviewed them (scripts/confirm-case.mjs).
import type { CasePage } from "../content";
// REGISTER-IMPORTS
import * as boothArmyHotel from "./booth_2024_2025_army_hotel";
import * as boothBreastCancerSurgery from "./booth_2024_2025_breast_cancer_surgery";
import * as boothBurgerPalace from "./booth_2024_2025_burger_palace";
import * as boothConsumerProductsStrategy from "./booth_2024_2025_consumer_products_strategy";
import * as boothChickenPoxVaccine from "./booth_2024_2025_chicken_pox_vaccine";
import * as boothCleaningProducts from "./booth_2024_2025_cleaning_products";
import * as boothCoffeeAndTeaApparel from "./booth_2024_2025_coffee_and_tea_apparel";
import * as boothCommercialVehicleOemInChina from "./booth_2024_2025_commercial_vehicle_oem_in_china";
import * as boothContactLenses from "./booth_2024_2025_contact_lenses";
import * as boothCraftCo from "./booth_2024_2025_craft_co";
import * as boothCruiseLineAcquisition from "./booth_2024_2025_cruise_line_acquisition";
import * as boothDeepwaterInc from "./booth_2024_2025_deepwater_inc";
import * as boothElectricUtility from "./booth_2024_2025_electric_utility";
import * as boothElenaSElectronics from "./booth_2024_2025_elena_s_electronics";
import * as boothFinanceCo from "./booth_2024_2025_finance_co";
import * as boothFrenchBeautyCo from "./booth_2024_2025_french_beauty_co";
import * as boothGermanTelecom from "./booth_2024_2025_german_telecom";
import * as boothGreenCo from "./booth_2024_2025_green_co";
import * as boothGreenshieldHealthInsurance from "./booth_2024_2025_greenshield_health_insurance";
import * as boothHawaiianSmoothies from "./booth_2024_2025_hawaiian_smoothies";
import * as boothHeavyAttrition from "./booth_2024_2025_heavy_attrition";
import * as boothApacheHelicopter from "./booth_2024_2025_apache_helicopter";
import * as boothInternationalAirlines from "./booth_2024_2025_international_airlines";
import * as boothKatrina from "./booth_2024_2025_katrina";
import * as boothLindasGreatBurgers from "./booth_2024_2025_linda_s_great_burgers";
import * as boothLolaLosZoo from "./booth_2024_2025_lola_lo_s_zoo";
import * as boothLostPatent from "./booth_2024_2025_lost_patent";
import * as boothMidwestMachineryCo from "./booth_2024_2025_midwest_machinery_co";
import * as boothNewVaccine from "./booth_2024_2025_new_vaccine";
import * as boothPaymentsCompany from "./booth_2024_2025_payments_company";
import * as boothPharmaceuticalRareDisease from "./booth_2024_2025_pharmaceutical_rare_disease";
import * as boothPyeongchangWinterOlympics from "./booth_2024_2025_pyeongchang_winter_olympics";
import * as boothQuahogPublicSchools from "./booth_2024_2025_quahog_public_schools";
import * as boothRetirementApartmentComplexes from "./booth_2024_2025_retirement_apartment_complexes";
import * as boothShoeCo from "./booth_2024_2025_shoe_co";
import * as boothSmartCards from "./booth_2024_2025_smart_cards";
import * as boothStudentHealthInsurance from "./booth_2024_2025_student_health_insurance";
import * as boothSuenoMattress from "./booth_2024_2025_sueno_mattress";
import * as boothSuperJrBabyFormula from "./booth_2024_2025_super_jr_baby_formula";
import * as boothTelcoTalks from "./booth_2024_2025_telco_talks";
import * as dardenCircleBubble from "./darden_2023_2024_circle_bubble";
import * as dardenRobotsInc from "./darden_2023_2024_robots_inc";
import * as rossSixPaqPeFirm from "./ross_2019_6paq_p_e_firm";
import * as sloanBrainteaser from "./sloan_2015_a_classic_brainteaser";
import * as sternPeSoda from "./stern_2015_2016_a_pe_and_a_soda";
import * as whartonPhightingPhillies from "./wharton_2017_phighting_phillies";
import * as yale7Eleven2024 from "./yale_ygcc_2024_7_eleven";

const MODULES: { CASE_ID: string; CASE_META: { review?: string }; PAGES: CasePage[] }[] = [
  // REGISTER-ENTRIES
  boothApacheHelicopter,
  boothArmyHotel,
  boothBreastCancerSurgery,
  boothBurgerPalace,
  boothConsumerProductsStrategy,
  boothChickenPoxVaccine,
  boothCleaningProducts,
  boothCoffeeAndTeaApparel,
  boothCommercialVehicleOemInChina,
  boothContactLenses,
  boothCraftCo,
  boothCruiseLineAcquisition,
  boothDeepwaterInc,
  boothElectricUtility,
  boothElenaSElectronics,
  boothFinanceCo,
  boothFrenchBeautyCo,
  boothGermanTelecom,
  boothGreenCo,
  boothGreenshieldHealthInsurance,
  boothHawaiianSmoothies,
  boothHeavyAttrition,
  boothInternationalAirlines,
  boothKatrina,
  boothLindasGreatBurgers,
  boothLolaLosZoo,
  boothLostPatent,
  boothMidwestMachineryCo,
  boothNewVaccine,
  boothPaymentsCompany,
  boothPharmaceuticalRareDisease,
  boothPyeongchangWinterOlympics,
  boothQuahogPublicSchools,
  boothRetirementApartmentComplexes,
  boothShoeCo,
  boothSmartCards,
  boothStudentHealthInsurance,
  boothSuenoMattress,
  boothSuperJrBabyFormula,
  boothTelcoTalks,
  dardenCircleBubble,
  dardenRobotsInc,
  rossSixPaqPeFirm,
  sloanBrainteaser,
  sternPeSoda,
  whartonPhightingPhillies,
  yale7Eleven2024,
];

export const AUTHORED_CASES: Record<string, CasePage[]> = Object.fromEntries(
  MODULES.map((m) => [m.CASE_ID, m.PAGES]),
);

// Case ids that were generated by the agents and not yet confirmed by the owner.
export const AUTO_GENERATED_IDS: ReadonlySet<string> = new Set(
  MODULES.filter((m) => m.CASE_META.review !== "confirmed").map((m) => m.CASE_ID),
);
