import { useState } from "react";
import { navigate } from "../App";
import { Breadcrumb } from "../components/Breadcrumb";
import { BookCover } from "../components/BookCover";
import { SoursopBookCover } from "../components/SoursopBookCover";
import { SuperfruitsBookCover } from "../components/SuperfruitsBookCover";

interface Props {
  bookId: string;
}

interface Chapter {
  number: number;
  title: string;
  preview: boolean;
  content: string;
}

interface BookData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice: number;
  checkoutId: string;
  pdfUrl: string;
  pages: number;
  chapters: Chapter[];
  tableOfContents: string[];
  coverComponent: "caribbean" | "soursop" | "superfruits";
}

const books: Record<string, BookData> = {
  "caribbean-fruit-guide": {
    id: "caribbean-fruit-guide",
    title: "The Caribbean Tropical Fruit Guide",
    subtitle: "Recipes • Health Benefits • Seasonal Guides • Storage Tips • Nutrition Facts",
    description: "The ultimate encyclopedia covering 50+ Caribbean and tropical fruits. From ackee to soursop, this guide provides complete profiles with authentic recipes, evidence-based health benefits, seasonal availability calendars, storage instructions, and cultural history. Whether you're a Caribbean native, a chef, or a health enthusiast — this is your definitive tropical fruit reference.",
    price: 12.99,
    originalPrice: 19.99,
    checkoutId: "ebook-caribbean-fruit-guide",
    pdfUrl: "https://image2url.com/r2/default/documents/1771979481368-df16b0ee-9819-4667-a8f2-4b3727d0f4b4.pdf",
    pages: 180,
    coverComponent: "caribbean",
    tableOfContents: [
      "Introduction to Caribbean Tropical Fruits",
      "Understanding Fruit Families & Classification",
      "50+ Complete Fruit Profiles (A–Z)",
      "Nutritional Breakdown & Comparison Charts",
      "Health Benefits & Medicinal Uses",
      "100+ Authentic Caribbean Recipes",
      "Seasonal Availability Calendar",
      "Storage, Ripening & Preservation Guide",
      "Growing Tropical Fruits at Home",
      "Cultural History & Caribbean Food Heritage",
      "Glossary of Caribbean Fruit Names",
      "Quick Reference Index",
    ],
    chapters: [
      {
        number: 1,
        title: "Introduction to Caribbean Tropical Fruits",
        preview: true,
        content: `The Caribbean region is home to some of the most diverse and flavorful tropical fruits on the planet. From the spiky exterior of soursop to the vibrant orange flesh of papaya, these fruits have sustained communities for centuries — providing nutrition, medicine, income, and cultural identity.

This guide is your complete reference to understanding, preparing, and benefiting from Caribbean tropical fruits. Whether you grew up eating guinep under a tree in Kingston, or you're discovering breadfruit for the first time in a London market — this book is for you.

**What Makes Caribbean Fruits Special?**

Caribbean fruits are unique because of the region's geography — a combination of volcanic soil, tropical climate, trade winds, and abundant rainfall creates perfect growing conditions for fruits that simply cannot thrive elsewhere.

Many of these fruits have deep cultural significance:
• **Ackee** — Jamaica's national fruit, brought from West Africa in the 18th century
• **Breadfruit** — introduced by Captain Bligh and now a Caribbean staple
• **Soursop** — used medicinally across the Caribbean for generations
• **Guinep** — the quintessential Caribbean childhood snack
• **Tamarind** — a key ingredient in Caribbean sauces and confections

**How to Use This Guide**

Each fruit profile in this book includes:
1. Common and scientific names
2. Origin and growing regions
3. Complete nutritional breakdown
4. Evidence-based health benefits
5. How to select, store, and prepare
6. Authentic Caribbean recipes
7. Seasonal availability chart
8. Cultural significance and traditional uses

We've organized the fruits alphabetically for easy reference, with cross-references to related recipes, seasonal guides, and health information throughout.

Whether you're cooking, growing, studying, or simply curious — turn the page and begin your tropical fruit journey.`,
      },
      {
        number: 2,
        title: "Understanding Fruit Families & Classification",
        preview: true,
        content: `Tropical fruits belong to several major botanical families. Understanding these families helps you predict flavor profiles, growing conditions, and nutritional content.

**Annonaceae (Custard Apple Family)**
This family includes some of the Caribbean's most beloved fruits:
• Soursop (Annona muricata)
• Custard Apple (Annona reticulata)
• Sugar Apple (Annona squamosa)
• Cherimoya (Annona cherimola)

These fruits share a creamy, aromatic flesh with a sweet-tart flavor. They're rich in B vitamins, vitamin C, and dietary fiber.

**Sapotaceae (Sapodilla Family)**
• Naseberry/Sapodilla (Manilkara zapota)
• Star Apple (Chrysophyllum cainito)
• Canistel (Pouteria campechiana)

Known for their sweet, malty flavors and smooth textures. High in natural sugars and minerals.

**Anacardiaceae (Cashew Family)**
• Mango (Mangifera indica)
• June Plum (Spondias dulcis)
• Hog Plum (Spondias mombin)

These fruits are characterized by their stone/pit structure and are typically high in vitamins A and C.

**Arecaceae (Palm Family)**
• Coconut (Cocos nucifera)

The coconut stands alone as the most versatile tropical fruit — water, milk, oil, cream, and flesh all come from this single fruit.

**Myrtaceae (Myrtle Family)**
• Guava (Psidium guajava)
• Malay Apple (Syzygium malaccense)

Known for their aromatic fragrance and high vitamin C content — guava contains 4x more vitamin C than an orange.

**Why Classification Matters for Your Kitchen**

Fruits within the same family often substitute well for each other in recipes. If you can't find soursop, custard apple will work in many of the same preparations. Understanding these relationships makes you a more versatile tropical cook.`,
      },
      {
        number: 3,
        title: "50+ Complete Fruit Profiles (A–Z)",
        preview: false,
        content: "This chapter contains detailed profiles for over 50 Caribbean and tropical fruits, organized alphabetically. Each profile includes photographs, nutritional data, growing information, recipes, and cultural context. Purchase the full ebook to access all profiles.",
      },
      {
        number: 4,
        title: "Nutritional Breakdown & Comparison Charts",
        preview: false,
        content: "Complete nutritional comparison charts for all fruits covered in this guide. Compare calories, vitamins, minerals, fiber, and antioxidant content side-by-side. Purchase the full ebook to access these charts.",
      },
      {
        number: 5,
        title: "Health Benefits & Medicinal Uses",
        preview: false,
        content: "Evidence-based health benefits for every fruit, including traditional medicinal uses and modern research findings. Purchase the full ebook to access this chapter.",
      },
      {
        number: 6,
        title: "100+ Authentic Caribbean Recipes",
        preview: false,
        content: "Over 100 tested recipes featuring Caribbean tropical fruits — from drinks and smoothies to main courses and desserts. Purchase the full ebook to access all recipes.",
      },
    ],
  },
  "soursop-guide": {
    id: "soursop-guide",
    title: "The Soursop Guide: Nature's Green Powerhouse",
    subtitle: "Health Benefits • Nutrition Facts • Cancer Research • Preparation • Safety",
    description: "A comprehensive, evidence-based guide to soursop (Graviola/Guanabana) — one of the most talked-about tropical fruits in natural health. This guide separates fact from fiction, covering real nutritional data, peer-reviewed health research, the cancer debate, safe preparation methods, traditional uses, and important safety precautions. Written for health-conscious readers who want the truth.",
    price: 8.99,
    originalPrice: 14.99,
    checkoutId: "ebook-soursop-guide",
    pdfUrl: "https://image2url.com/r2/default/documents/1771979481368-df16b0ee-9819-4667-a8f2-4b3727d0f4b4.pdf",
    pages: 85,
    coverComponent: "soursop",
    tableOfContents: [
      "Introduction: What is Soursop?",
      "Nutritional Profile",
      "Core Health Benefits",
      "The Cancer Debate: Fact vs. Fiction",
      "Preparation and Usage",
      "Safety, Side Effects, and Precautions",
      "Soursop Recipes & Preparations",
      "Buying, Storing & Growing Soursop",
      "References & Further Reading",
    ],
    chapters: [
      {
        number: 1,
        title: "Introduction: What is Soursop?",
        preview: true,
        content: `Soursop, also known as **Graviola** or **Guanabana**, is a tropical fruit native to the Americas and the Caribbean. It is famous for its unique flavor profile — a tangy-sweet cross between pineapple and strawberry with a creamy, citrusy undertone.

The fruit itself is striking: large (sometimes up to 15 pounds), heart-shaped, covered in soft spines, with white, fibrous flesh and shiny black seeds inside. Its scientific name is *Annona muricata*, and it belongs to the custard apple family (Annonaceae).

Beyond its taste, the leaves, fruit, and seeds have been used for centuries in traditional medicine across the Caribbean, Central America, South America, and West Africa to treat everything from inflammation to parasitic infections.

**A Fruit With Deep Cultural Roots**

In Jamaica, soursop juice is a beloved household staple — served ice-cold with condensed milk and nutmeg. In Trinidad, the fruit is blended into punch. In Brazil, it's called "graviola" and sold as juice in every corner store. In the Philippines, it's known as "guyabano."

The fruit has gained massive international attention in recent years due to claims about its potential anti-cancer properties. While the research is intriguing, this guide takes an honest, evidence-based approach — celebrating what soursop genuinely offers while being transparent about what science has and hasn't proven.

**Why This Guide Exists**

There is an overwhelming amount of misinformation about soursop online. Some sources call it a "miracle cure." Others dismiss it entirely. Neither extreme is accurate.

This guide provides:
• Real nutritional data from peer-reviewed sources
• Honest analysis of health benefit claims
• The actual state of cancer research
• Safe preparation methods
• Important warnings and contraindications
• Authentic recipes from across the Caribbean

Whether you drink soursop juice every week or you've never tried it — this guide will give you the full, honest picture.`,
      },
      {
        number: 2,
        title: "Nutritional Profile",
        preview: true,
        content: `Soursop is nutrient-dense but low in calories, making it an excellent addition to a health-conscious diet. Here's what you get from this remarkable fruit.

**Macronutrient Breakdown (per 100g of raw soursop pulp)**

| Nutrient | Amount | % Daily Value |
|----------|--------|--------------|
| Calories | 66 kcal | 3% |
| Total Carbohydrates | 16.8g | 6% |
| Dietary Fiber | 3.3g | 12% |
| Sugars | 13.5g | — |
| Protein | 1.0g | 2% |
| Total Fat | 0.3g | <1% |
| Water | 81.2g | — |

**Vitamin Content (per 100g)**

| Vitamin | Amount | % Daily Value |
|---------|--------|--------------|
| Vitamin C | 20.6mg | 34% |
| Thiamin (B1) | 0.07mg | 5% |
| Riboflavin (B2) | 0.05mg | 3% |
| Niacin (B3) | 0.9mg | 5% |
| Vitamin B6 | 0.059mg | 3% |
| Folate | 14μg | 4% |

**Mineral Content (per 100g)**

| Mineral | Amount | % Daily Value |
|---------|--------|--------------|
| Potassium | 278mg | 8% |
| Magnesium | 21mg | 5% |
| Phosphorus | 27mg | 3% |
| Calcium | 14mg | 1% |
| Iron | 0.6mg | 3% |
| Zinc | 0.1mg | 1% |

**Key Antioxidants Found in Soursop**

Soursop contains several powerful antioxidant compounds:

• **Luteolin** — a flavonoid with anti-inflammatory and neuroprotective properties
• **Quercetin** — one of the most studied antioxidants, linked to reduced blood pressure and heart disease risk
• **Tangeretin** — a flavonoid with emerging anti-cancer research interest
• **Acetogenins** — compounds unique to the Annonaceae family, the subject of extensive cancer research (covered in Chapter 4)

**Nutritional Highlights**

1. **High Vitamin C**: One cup of soursop provides over 75% of your daily vitamin C needs — essential for immune function, collagen production, and iron absorption.

2. **Good Fiber Source**: At 3.3g per 100g, soursop supports digestive health, blood sugar regulation, and satiety.

3. **Potassium-Rich**: Important for heart health, muscle function, and maintaining healthy blood pressure.

4. **Low Fat**: With less than 0.5g of fat per serving, soursop is naturally lean while being naturally sweet and satisfying.

The combination of high vitamin C, significant fiber, and diverse antioxidant compounds makes soursop a nutritionally compelling tropical fruit — before we even consider the medicinal research.`,
      },
      {
        number: 3,
        title: "Core Health Benefits",
        preview: true,
        content: `The health benefits of soursop are supported by a growing body of scientific research. Here's what the evidence shows:

**1. High Antioxidant Load**

Soursop is rich in antioxidants, which help neutralize harmful compounds called free radicals. Free radicals are unstable molecules that damage cells through a process called oxidative stress — a contributor to aging, heart disease, and cancer.

A 2014 study in the journal *Food Chemistry* analyzed soursop extracts and found significant antioxidant activity, particularly from its flavonoid and phenolic compounds. The researchers concluded that soursop "shows promising antioxidant potential" for disease prevention.

Key antioxidants: Luteolin, Quercetin, Tangeretin

**2. Anti-Inflammatory Properties**

Compounds in soursop — particularly its alkaloids and acetogenins — have been shown to reduce markers of inflammation in animal studies.

A study published in the *Journal of Ethnopharmacology* found that soursop leaf extracts reduced paw swelling in rats by up to 37%, comparable to standard anti-inflammatory drugs. While human trials are needed, this supports its traditional use as a remedy for:
• Arthritis and joint pain
• Swelling and bruising
• Inflammatory skin conditions

**3. Immune System Support**

Thanks to its massive dose of Vitamin C, soursop stimulates the production of white blood cells — your body's first line of defense against pathogens.

One cup of soursop pulp provides approximately 46mg of vitamin C (77% of the recommended daily intake). Vitamin C also:
• Enhances the function of phagocytes (cells that engulf pathogens)
• Supports the skin barrier against environmental damage
• Acts as an antioxidant within immune cells themselves

**4. Digestive Health**

The high fiber content (3.3g per 100g) aids in:
• Regular bowel movements
• Prevention of constipation
• Feeding beneficial gut bacteria (prebiotic effect)
• Stabilizing blood sugar after meals

In some Caribbean cultures, soursop juice is also used as a mild diuretic to help cleanse the gastrointestinal tract and reduce water retention.

**5. Antibacterial Effects**

Multiple studies have demonstrated that soursop extracts have significant antibacterial properties. A 2016 study in *BMC Complementary and Alternative Medicine* found that soursop leaf extracts effectively killed several types of bacteria, including:

• *Staphylococcus aureus* (skin infections)
• *Streptococcus mutans* (dental cavities)
• *Porphyromonas gingivalis* (gum disease)
• *Vibrio cholerae* (cholera)

The minimum inhibitory concentrations (MIC) were comparable to some conventional antibiotics, though the researchers noted that more research is needed before therapeutic applications.

**6. Blood Sugar Regulation**

Animal studies suggest soursop may help regulate blood glucose levels. A study in *African Journal of Traditional, Complementary and Alternative Medicines* found that soursop leaf extract significantly reduced blood sugar levels in diabetic rats.

The proposed mechanisms include:
• Slowing carbohydrate absorption in the gut
• Enhancing insulin sensitivity
• Protecting pancreatic beta cells from oxidative damage

**Important Note**: These benefits are based on laboratory and animal studies. While traditional use supports many of these claims, always consult with a healthcare provider before using soursop as a health intervention, especially if you're on medication.`,
      },
      {
        number: 4,
        title: "The Cancer Debate: Fact vs. Fiction",
        preview: true,
        content: `This is the chapter most people want to read. Soursop has been called a "miracle cancer cure" across social media, alternative health blogs, and forwarded WhatsApp messages. Here is the grounded truth.

**What the Research Actually Shows**

The scientific interest in soursop's anti-cancer potential centers on compounds called **acetogenins** — molecules unique to the Annonaceae (custard apple) family. Over 100 different acetogenins have been identified in soursop.

**Laboratory Studies (In Vitro)**

Multiple peer-reviewed studies have demonstrated that soursop extracts can kill cancer cells in laboratory settings:

• A 1996 study in the *Journal of Natural Products* found that an acetogenin from soursop was "selectively cytotoxic" to human liver cancer cells (HepG2), with potency 10,000 times greater than the chemotherapy drug Adriamycin.

• A 2012 study in *Nutrition and Cancer* showed that soursop extract inhibited the growth of breast cancer cells (MDA-MB-468) by downregulating the EGFR gene.

• Research published in *Cancer Letters* (2011) found that soursop leaf extract suppressed the growth of pancreatic cancer cells and inhibited their ability to metastasize.

• A 2018 study in *BMC Complementary and Alternative Medicine* demonstrated that soursop fruit extract induced apoptosis (programmed cell death) in colon cancer cells.

**The Critical Caveat**

Here is what those studies do NOT prove:

1. **No human clinical trials exist.** All positive results are from test tubes (in vitro) or animal models. Killing cancer cells in a petri dish is fundamentally different from treating cancer in a human body.

2. **Many substances kill cancer cells in labs.** Bleach kills cancer cells. So does fire. The challenge is killing cancer cells while keeping healthy cells alive inside a living person.

3. **Dosage is unknown.** The concentrations of acetogenins used in lab studies are far higher than what you'd get from eating the fruit or drinking the tea.

4. **Delivery mechanism is unclear.** We don't know if acetogenins can reach tumor sites in sufficient concentration when consumed orally.

**The Verdict**

Soursop contains compounds with genuine, demonstrable anti-cancer activity in laboratory settings. This is scientifically interesting and worth continued research.

However, soursop is **NOT** a proven cancer treatment. It should **NEVER** be used as a replacement for conventional medical treatment — chemotherapy, radiation, surgery, or immunotherapy.

If you or someone you love is fighting cancer:
• Continue all treatments prescribed by your oncologist
• Discuss soursop with your doctor before consuming it (it can interact with some medications)
• View soursop as a nutritious food, not a medicine
• Be skeptical of anyone selling soursop as a "cure"

The most responsible position: Soursop is a healthy, nutritious tropical fruit with exciting research potential. Eat it because it's delicious and nutritious. Don't eat it expecting it to cure disease.`,
      },
      {
        number: 5,
        title: "Preparation and Usage",
        preview: true,
        content: `Soursop is versatile in the kitchen. Here are the main ways to enjoy it safely:

**Eating the Fruit Raw**

1. Select a ripe soursop — it should give slightly when pressed (like a ripe avocado)
2. Cut it in half lengthwise
3. Scoop out the white flesh with a spoon
4. **Always discard the seeds** — they contain annonacin, a neurotoxin
5. The flesh can be eaten directly or used in recipes

**Soursop Juice (Caribbean Style)**

The most popular preparation across the Caribbean:
• 2 cups soursop pulp (seeds removed)
• 3 cups cold water
• Condensed milk or sugar to taste
• 1/4 tsp nutmeg (freshly grated)
• 1/2 tsp vanilla extract
• Pinch of salt

Blend pulp with water, strain through a fine sieve to remove fibrous material, add condensed milk, nutmeg, and vanilla. Serve over ice. This is the quintessential Caribbean soursop drink.

**Graviola Tea (Soursop Leaf Tea)**

Soursop leaves are dried and steeped in hot water to create "Graviola Tea," which is prized for its calming and sedative effects:
• 3-4 dried soursop leaves
• 2 cups boiling water
• Steep for 15-20 minutes
• Strain and add honey if desired

Traditional uses: Sleep aid, stress relief, mild pain relief

**Soursop Smoothie**

• 1 cup soursop pulp
• 1 banana
• 1/2 cup coconut milk
• Juice of 1 lime
• Honey to taste
• Ice

Blend until smooth. The combination of soursop's tanginess with banana's sweetness creates a perfectly balanced tropical smoothie.

**Soursop Ice Cream**

Popular in the Caribbean and Latin America:
• 2 cups soursop pulp (strained)
• 1 can coconut cream
• 3/4 cup sugar
• 1 tsp vanilla
• Pinch of salt

Mix ingredients, pour into an ice cream maker, and churn according to manufacturer's instructions. If you don't have an ice cream maker, pour into a container and freeze, stirring every 30 minutes for 3-4 hours.

**Important Preparation Safety**

• Always remove ALL seeds before consuming — they are toxic
• Wash the exterior thoroughly before cutting
• Ripe soursop is highly perishable — use within 2-3 days of ripening
• Unripe soursop can be frozen whole and thawed when ready to use
• The skin is not edible`,
      },
      {
        number: 6,
        title: "Safety, Side Effects, and Precautions",
        preview: true,
        content: `While soursop is generally safe when consumed in moderation as a food, there are significant warnings that every consumer should know.

**1. Neurotoxicity Risk**

This is the most serious concern. Soursop contains **annonacin**, a compound found primarily in the seeds but also present in small amounts in the fruit and leaves.

Research from INSERM (French National Institute of Health) found that long-term, excessive consumption of annonacin is associated with atypical Parkinsonism — a condition with symptoms similar to Parkinson's disease, including:
• Tremors
• Muscle rigidity
• Difficulty with movement and balance

A epidemiological study in Guadeloupe found that people who consumed soursop tea daily for years had a significantly higher incidence of movement disorders.

**Key Takeaway**: Occasional consumption of soursop fruit is considered safe. Daily, long-term consumption of soursop tea (made from leaves) or supplements carries a neurotoxicity risk.

**2. Blood Pressure Interactions**

Soursop has demonstrated hypotensive (blood-pressure-lowering) effects in animal studies. If you are:
• Taking blood pressure medication (ACE inhibitors, beta-blockers, calcium channel blockers)
• Already have low blood pressure

Consuming large amounts of soursop could cause blood pressure to drop too low, leading to dizziness, fainting, or worse.

**3. Blood Sugar Interactions**

Similarly, soursop may lower blood glucose levels. If you have diabetes and take:
• Insulin
• Metformin
• Sulfonylureas
• Other glucose-lowering medications

Monitor your blood sugar carefully if consuming soursop regularly, as it may amplify the effects of your medication.

**4. Pregnancy and Breastfeeding**

It is generally advised that pregnant or breastfeeding women avoid soursop supplements and extracts. The annonacin content and potential uterine-stimulant effects make it a precautionary avoidance.

Occasional consumption of the fruit in normal food amounts is likely safe, but concentrated extracts, teas, and supplements should be avoided during pregnancy.

**5. Liver and Kidney Health**

High-dose soursop extracts have shown potential liver and kidney toxicity in animal studies. People with existing liver or kidney conditions should consult their healthcare provider before regular consumption.

**6. Drug Interactions**

Soursop may interact with:
• Antihypertensive medications
• Antidiabetic medications
• Antidepressants (MAOIs)
• Coenzyme Q10 supplements
• Blood thinners

**The Bottom Line**

Soursop is a safe, nutritious fruit when consumed in moderation as part of a normal diet. The risks emerge with:
• Daily, long-term consumption of soursop tea or supplements
• High-dose concentrated extracts
• Consumption while on interacting medications
• Ignoring the seeds (always discard them)

Enjoy soursop as food. Be cautious with soursop as medicine. Always consult your healthcare provider if you have existing health conditions or take medications.`,
      },
      {
        number: 7,
        title: "Soursop Recipes & Preparations",
        preview: false,
        content: "This chapter contains 15+ authentic soursop recipes from across the Caribbean and Latin America — juices, desserts, ice cream, preserves, and savory dishes. Purchase the full ebook to access all recipes.",
      },
      {
        number: 8,
        title: "Buying, Storing & Growing Soursop",
        preview: false,
        content: "Complete guide to selecting ripe soursop, proper storage methods, freezing techniques, and growing soursop trees at home. Purchase the full ebook to access this chapter.",
      },
      {
        number: 9,
        title: "References & Further Reading",
        preview: false,
        content: "Full bibliography of all peer-reviewed studies, journals, and sources cited in this guide. Purchase the full ebook to access the complete reference list.",
      },
    ],
  },
  "superfruits-guide": {
    id: "superfruits-guide",
    title: "The Complete Guide to Caribbean Superfruits: Soursop, Papaya & Banana",
    subtitle: "Understanding, Preparing, and Enjoying Nature's Tropical Powerhouses",
    description: "A comprehensive guide covering three of the Caribbean's most powerful fruits in one volume. Part 1 delivers an in-depth soursop guide with real nutritional data, cancer research analysis, a 7-day meal plan, and essential recipes. Part 2 features a curated papaya & banana recipe collection with international dishes. Complete with safety warnings, preparation methods, and evidence-based health information.",
    price: 14.99,
    originalPrice: 24.99,
    checkoutId: "ebook-superfruits-guide",
    pdfUrl: "https://image2url.com/r2/default/documents/1771979481368-df16b0ee-9819-4667-a8f2-4b3727d0f4b4.pdf",
    pages: 120,
    coverComponent: "superfruits",
    tableOfContents: [
      "Part 1: The Soursop Guide",
      "Ch 1 — Introduction to Soursop",
      "Ch 2 — Nutritional Profile & Core Health Benefits",
      "Ch 3 — The Cancer Debate: Fact vs. Fiction",
      "Ch 4 — Safety, Side Effects & Precautions",
      "Ch 5 — The 7-Day Soursop Meal Plan",
      "Ch 6 — Essential Soursop Recipes",
      "Part 2: Papaya & Banana Recipe Collection",
      "Ch 7 — Zesty Green Papaya Salad",
      "Ch 8 — Classic Banana Walnut Bread",
    ],
    chapters: [
      {
        number: 1,
        title: "Introduction to Soursop",
        preview: true,
        content: `Soursop, also known as **Graviola** or **Guanabana**, is a tropical fruit native to the Americas and the Caribbean. It is famous for its unique flavor profile — a tangy-sweet cross between pineapple and strawberry with a creamy, citrusy undertone.

Beyond its taste, the leaves, fruit, and seeds have been used for centuries in traditional medicine to treat everything from inflammation to parasitic infections.

The fruit itself is striking: large (sometimes up to 15 pounds), heart-shaped, covered in soft spines, with white, fibrous flesh and shiny black seeds inside. Its scientific name is *Annona muricata*, and it belongs to the custard apple family (Annonaceae).

**A Fruit With Deep Cultural Roots**

In Jamaica, soursop juice is a beloved household staple — served ice-cold with condensed milk and nutmeg. In Trinidad, the fruit is blended into punch. In Brazil, it's called "graviola" and sold as juice in every corner store. In the Philippines, it's known as "guyabano."

The fruit has gained massive international attention in recent years due to claims about its potential anti-cancer properties. While the research is intriguing, this guide takes an honest, evidence-based approach — celebrating what soursop genuinely offers while being transparent about what science has and hasn't proven.

**About This Guide**

This book is divided into two parts:

**Part 1: The Soursop Guide** — An in-depth look at soursop covering everything from real nutritional data and peer-reviewed health research to the cancer debate (fact vs. fiction), safe preparation methods, a 7-day meal plan, and essential recipes.

**Part 2: The Tropical Pair — Papaya & Banana Recipe Collection** — A curated collection of international recipes featuring two of the most beloved tropical fruits, perfect for everyday cooking and special occasions alike.

Whether you're a health enthusiast, a Caribbean food lover, or someone looking to incorporate more tropical nutrition into your diet — this guide has everything you need.`,
      },
      {
        number: 2,
        title: "Nutritional Profile & Core Health Benefits",
        preview: true,
        content: `Soursop is nutrient-dense but low in calories. A typical 100g serving provides:

**Nutritional Data (per 100g raw soursop pulp)**

| Nutrient | Amount | % Daily Value |
|----------|--------|--------------|
| Vitamin C | 20.6mg | 34% of DV |
| Potassium | 278mg | 8% of DV |
| Magnesium | 21mg | 5% of DV |
| Fiber | 3.3 grams | 12% of DV |
| Calories | 66 kcal | 3% of DV |
| Protein | 1.0g | 2% of DV |
| Fat | 0.3g | <1% of DV |

**Key Antioxidants:** Luteolin, Quercetin, Tangeretin

**Core Health Benefits**

**High Antioxidant Load**

Soursop is rich in antioxidants, which help neutralize harmful compounds called free radicals. This protects your cells from oxidative stress and may reduce the risk of chronic diseases like heart disease.

A 2014 study in *Food Chemistry* found significant antioxidant activity in soursop extracts, particularly from flavonoid and phenolic compounds.

**Anti-Inflammatory Properties**

Compounds in soursop have been shown to reduce swelling and inflammation. A study in the *Journal of Ethnopharmacology* found that soursop leaf extracts reduced inflammation by up to 37% in animal models. This makes it a popular folk remedy for arthritis and joint pain.

**Immune System Support**

Thanks to its massive dose of Vitamin C, soursop stimulates the production of white blood cells, which are the body's first line of defense against pathogens. One cup provides approximately 77% of your daily vitamin C needs.

**Digestive Health**

The high fiber content aids in regular bowel movements and helps prevent constipation. In some cultures, the juice is also used as a diuretic to cleanse the gastrointestinal tract.

**Antibacterial Effects**

Studies suggest soursop extracts can effectively kill several types of bacteria, including those that cause gum disease, cavities, and cholera. A 2016 study in *BMC Complementary and Alternative Medicine* confirmed significant antibacterial properties.`,
      },
      {
        number: 3,
        title: "The Cancer Debate: Fact vs. Fiction",
        preview: true,
        content: `**The Peer-to-Peer Reality Check**

You may have heard soursop is a "miracle cure" for cancer. Here is the grounded truth:

**The Science**

In laboratory settings (test tubes), soursop extracts containing compounds called **acetogenins** have successfully killed certain types of breast and liver cancer cells. Key studies include:

• A 1996 study in *Journal of Natural Products* — acetogenins showed potency 10,000x greater than the chemotherapy drug Adriamycin against liver cancer cells
• A 2012 study in *Nutrition and Cancer* — soursop extract inhibited breast cancer cell growth
• A 2011 study in *Cancer Letters* — leaf extract suppressed pancreatic cancer cell growth
• A 2018 study in *BMC Complementary and Alternative Medicine* — fruit extract triggered colon cancer cell death

**The Caveat**

There are **no large-scale human clinical trials** that prove soursop can treat or cure cancer in people.

Important points to understand:
1. Killing cancer cells in a petri dish is fundamentally different from treating cancer in a human body
2. Many substances kill cancer cells in labs — the challenge is doing so safely in a living person
3. The concentrations used in lab studies are far higher than what you'd get from eating the fruit
4. We don't know if the active compounds can reach tumor sites when consumed orally

**The Verdict**

While it is a healthy addition to a balanced diet, it should **never** replace conventional medical treatment for cancer.

If you or someone you love is fighting cancer:
• Continue all treatments prescribed by your oncologist
• Discuss soursop with your doctor before consuming it
• View soursop as a nutritious food, not a medicine
• Be skeptical of anyone selling soursop as a "cure"

The most responsible position: Soursop is a healthy, nutritious tropical fruit with exciting research potential. Eat it because it's delicious and nutritious — not because you expect it to cure disease.`,
      },
      {
        number: 4,
        title: "Safety, Side Effects, and Precautions",
        preview: true,
        content: `While soursop is generally safe in moderation, there are significant warnings to keep in mind:

**1. Neurotoxicity**

Long-term, excessive consumption (especially of the seeds and tea) is linked to nerve damage and movement disorders similar to Parkinson's disease. Moderate your intake.

Soursop contains **annonacin**, a compound found primarily in the seeds but also present in small amounts in the fruit and leaves. Research from INSERM (French National Institute of Health) found that chronic exposure is associated with atypical Parkinsonism, including:
• Tremors
• Muscle rigidity
• Difficulty with movement and balance

An epidemiological study in Guadeloupe found that people who consumed soursop tea daily for years had significantly higher rates of movement disorders.

**Key Takeaway**: Occasional consumption is safe. Daily, long-term consumption of soursop tea or supplements carries real neurotoxicity risk.

**2. Blood Pressure/Sugar**

Soursop can lower blood pressure and blood sugar. If you are on medication for diabetes or hypertension, consult your doctor first.

This is particularly important if you take:
• ACE inhibitors, beta-blockers, or calcium channel blockers
• Insulin, Metformin, or Sulfonylureas
• Other glucose-lowering medications

**3. Pregnancy**

It is generally advised that pregnant or breastfeeding women avoid soursop supplements/extracts. The annonacin content and potential uterine-stimulant effects make it a precautionary avoidance.

Occasional consumption of the fruit in normal food amounts is likely safe, but concentrated extracts and teas should be avoided.

**4. Seed Toxicity**

**Always discard the seeds** before consuming the fruit, as they contain high concentrations of neurotoxins. Never blend, chew, or consume soursop seeds in any form.

**5. Drug Interactions**

Soursop may interact with:
• Antihypertensive medications
• Antidiabetic medications
• Antidepressants (MAOIs)
• Coenzyme Q10 supplements
• Blood thinners

**The Bottom Line**: Enjoy soursop as food. Be cautious with soursop as medicine. Always consult your healthcare provider if you have existing health conditions.`,
      },
      {
        number: 5,
        title: "The 7-Day Soursop Meal Plan",
        preview: true,
        content: `**Important Note:** Because of the neurotoxicity warnings associated with overconsumption, this meal plan spaces out soursop intake to safe, moderate levels, mixing it with other healthy foods.

**7-Day Soursop Meal Plan**

| Day | Breakfast | Lunch | Dinner / Snack |
|-----|-----------|-------|----------------|
| Day 1 | Soursop & Banana Smoothie | Grilled chicken salad with mango salsa | Snack: Handful of raw almonds |
| Day 2 | Oatmeal topped with fresh berries | Black bean and roasted sweet potato bowl | Evening: 1 cup Soursop Leaf Tea (Graviola tea) |
| Day 3 | Greek yogurt with 1/2 cup fresh raw soursop chunks | Quinoa salad with avocado and lime | Snack: Carrot sticks and hummus |
| Day 4 | Scrambled eggs with spinach | Leftover quinoa salad | Dessert: 1 scoop Dairy-Free Soursop Sorbet |
| Day 5 | Classic Soursop Juice & whole wheat toast | Lentil soup with a side of mixed greens | Evening: Chamomile tea |
| Day 6 | Tropical Fruit Bowl | Grilled fish tacos with cabbage slaw | Snack: Plantain chips |
| Day 7 | Soursop Smoothie Bowl topped with chia seeds | Spicy jerk chicken wrap | Evening: 1 cup Soursop Leaf Tea |

**Meal Plan Guidelines**

• Soursop is included **3-4 times per week**, not daily — respecting the safety guidelines from Chapter 4
• Tea is limited to **2 cups per week maximum**
• Each soursop portion is approximately **1/2 to 1 cup** of pulp
• The plan is balanced with protein, healthy fats, and complex carbohydrates
• All meals are Caribbean-inspired but accessible with common ingredients
• Total calories per day: approximately 1,600-2,000 (adjustable)

**Shopping List for the Week**

Fruits & Vegetables:
• 2 ripe soursops (or 4 cups frozen pulp)
• 3 bananas
• 1 mango
• 1 avocado
• Mixed berries (1 cup)
• Spinach, lettuce, cabbage
• Carrots, sweet potatoes
• Tomatoes, limes

Proteins:
• Chicken breast (2)
• Fish fillets (2)
• Eggs (half dozen)
• Black beans (1 can)
• Lentils (1 cup dried)
• Greek yogurt (1 container)

Pantry:
• Oatmeal
• Quinoa
• Whole wheat bread & tortillas
• Almonds
• Chia seeds
• Dried soursop leaves (for tea)
• Olive oil, spices (jerk seasoning, cumin)`,
      },
      {
        number: 6,
        title: "Essential Soursop Recipes",
        preview: true,
        content: `**1. Classic Jamaican-Style Soursop Juice**

**Ingredients:**
• 1 ripe soursop
• 3 cups water
• 1 tsp vanilla extract
• 1/2 tsp grated nutmeg
• Sweetener of choice (condensed milk, sugar, or honey)
• Squeeze of lime

**Instructions:**
1. Peel the soursop and extract the white pulp
2. Using your hands in a large bowl, squeeze and massage the pulp in the water to release the juices. **Remove and discard all seeds.**
3. Strain the liquid through a fine-mesh sieve or cheesecloth into a pitcher
4. Stir in the vanilla, nutmeg, sweetener, and lime juice
5. Serve chilled over ice

This is the quintessential Caribbean soursop preparation — creamy, fragrant, and deeply refreshing.

**2. Soursop & Mango Immune-Booster Smoothie**

**Ingredients:**
• 1/2 cup seeded soursop pulp
• 1/2 cup frozen mango chunks
• 1/2 banana
• 1 cup coconut water

**Instructions:**
Combine all ingredients in a blender and blend until completely smooth. Serve immediately for maximum nutrition.

**Nutritional Bonus:** This smoothie delivers over 100% of your daily Vitamin C from natural sources.

**3. Calming Soursop Leaf Tea**

**Ingredients:**
• 2-3 dried soursop leaves
• 2 cups boiling water
• Honey to taste (optional)

**Instructions:**
1. Wash the leaves thoroughly
2. Place them in a teapot and pour boiling water over them
3. Let steep for 10-15 minutes
4. Strain and serve warm

**Traditional Uses:** Sleep aid, stress relief, mild pain management. Limit to 2 cups per week as per safety guidelines.

**4. Soursop Ice Cream (Dairy-Free)**

**Ingredients:**
• 2 cups soursop pulp (strained, seeds removed)
• 1 can full-fat coconut cream
• 3/4 cup sugar
• 1 tsp vanilla extract
• Pinch of salt

**Instructions:**
1. Blend soursop pulp until smooth, then strain to remove any fibrous bits
2. Mix with coconut cream, sugar, vanilla, and salt
3. Pour into ice cream maker and churn according to instructions
4. If no ice cream maker: pour into a freezer-safe container, freeze for 1 hour, stir vigorously, repeat 3-4 times until creamy
5. Freeze until firm (about 4 hours total)

**Note:** This dairy-free version is creamier than you'd expect — the coconut cream and soursop pulp create a luxurious texture.`,
      },
      {
        number: 7,
        title: "Zesty Green Papaya Salad (Som Tum Style)",
        preview: true,
        content: `**Welcome to Part 2: The Tropical Pair — Papaya & Banana Recipe Collection**

This section features curated recipes for two of the most beloved tropical fruits. We start with a refreshing, crunchy, and flavorful salad that perfectly balances sweet, sour, and spicy notes. It's a perfect light lunch or side dish.

**Zesty Green Papaya Salad**

This dish originated in Southeast Asia but has been adopted across the Caribbean with local variations. The key is using **green (unripe) papaya** — firm, crunchy, and slightly tangy.

**Ingredients:**
• 2 cups shredded green papaya
• 1/2 cup cherry tomatoes, halved
• 1/4 cup long beans (or green beans), cut into 1-inch pieces
• 2 tbsp roasted peanuts
• 1 tbsp dried shrimp (optional)

**For the Dressing:**
• 1-2 Thai chili peppers
• 1 clove garlic
• 1 tbsp palm sugar (or brown sugar)
• 2 tbsp fish sauce (or soy sauce for vegan)
• 2 tbsp fresh lime juice

**Instructions:**

1. **Prepare the dressing:** In a mortar and pestle, pound the chili peppers and garlic until a paste forms. This releases the essential oils and creates the flavor base.

2. **Add the long beans** and dried shrimp, and lightly pound to bruise them. This softens them slightly while infusing the dressing flavors.

3. **Build the sauce:** Add the sugar, fish sauce, and lime juice. Stir and pound gently to dissolve the sugar and mix the flavors.

4. **Combine with papaya:** Add the shredded papaya and cherry tomatoes. Use a spoon and the pestle to toss and bruise the ingredients together, ensuring they are well-coated in the dressing.

5. **Serve:** Transfer to a serving plate, top with roasted peanuts, and serve immediately.

**Tips:**
• Use a julienne peeler or mandoline to shred the green papaya into long, thin strips
• If you can't find green papaya, firm green mango makes an excellent substitute
• Adjust chili to your heat preference — start with one pepper
• For a Caribbean twist, add scotch bonnet instead of Thai chili and use tamarind paste in place of the lime juice

**Nutritional Benefits of Green Papaya:**
• Rich in papain (a digestive enzyme)
• High in Vitamin C (even when unripe)
• Low in calories and sugar
• Good source of dietary fiber
• Contains folate and potassium`,
      },
      {
        number: 8,
        title: "Classic Banana Walnut Bread",
        preview: true,
        content: `This is a timeless favorite — a moist, sweet bread that is perfect for breakfast or as a snack. The walnuts add a wonderful crunch. This recipe uses **overripe bananas** — the ones with brown spots that are too soft to eat on their own are actually perfect for baking.

**Classic Banana Walnut Bread**

**Ingredients:**
• 3 ripe bananas, mashed
• 1/3 cup melted butter
• 1/2 cup sugar
• 1 egg, beaten
• 1 tsp vanilla extract
• 1 tsp baking soda
• Pinch of salt
• 1 1/2 cups all-purpose flour
• 1/2 cup chopped walnuts (optional)

**Instructions:**

1. **Preheat** oven to 350°F (175°C). Grease a 9x5-inch loaf pan.

2. **Mash the bananas** in a large bowl with a fork until mostly smooth (a few small chunks are fine — they add texture).

3. **Add the wet ingredients:** Mix the mashed bananas with the melted butter. Stir in the sugar, egg, and vanilla until well combined.

4. **Add the dry ingredients:** Sprinkle the baking soda and salt over the mixture and stir. Add the flour and mix until just combined. **Do not overmix** — overmixing develops the gluten and makes the bread tough.

5. **Add walnuts:** Fold in the chopped walnuts if using. Reserve a few to sprinkle on top.

6. **Pour and bake:** Pour the batter into the prepared loaf pan. Bake for 50-60 minutes, or until a toothpick inserted into the center comes out clean.

7. **Cool:** Let the bread cool in the pan for 10 minutes before transferring to a wire rack to cool completely. Slice and serve.

**Tips for the Perfect Banana Bread:**
• **Banana ripeness matters:** The browner and softer the bananas, the sweeter and more flavorful the bread. Overripe bananas have higher sugar content and more banana flavor.
• **Don't overmix:** Stir the flour in gently — lumps are okay! Overmixing creates a dense, chewy texture instead of a tender crumb.
• **Storage:** Wrap tightly in plastic wrap and store at room temperature for 2-3 days, or freeze for up to 3 months.
• **Caribbean variation:** Add 1/4 cup desiccated coconut and a pinch of cinnamon for a Caribbean-inspired version. You can also replace butter with coconut oil.

**Nutritional Benefits of Bananas:**
• Excellent source of potassium (9% DV per banana)
• Rich in Vitamin B6 (25% DV per banana)
• Natural energy boost from natural sugars
• Contains tryptophan, which aids serotonin production
• Good source of dietary fiber (3.1g per medium banana)
• Contains resistant starch (especially when less ripe), which supports gut health

**Banana Facts:**
• Bananas are the world's most popular fruit
• They're technically berries (botanically speaking)
• The average person eats over 100 bananas per year
• They contain natural compounds that may help regulate mood
• Banana peels can be used as fertilizer for garden plants`,
      },
    ],
  },
};

export function EbookPreviewPage({ bookId }: Props) {
  const book = books[bookId];
  const [activeChapter, setActiveChapter] = useState(0);

  if (!book) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <span className="text-6xl block mb-4">📚</span>
        <h1 className="font-heading text-2xl font-bold mb-4">Book Not Found</h1>
        <p className="text-charcoal-light mb-6">This ebook doesn't exist.</p>
        <button onClick={() => navigate("/store")} className="btn-primary">← Back to Store</button>
      </div>
    );
  }

  const currentChapter = book.chapters[activeChapter];

  function renderCover(size: "sm" | "md" | "lg" | "xl") {
    if (book.coverComponent === "soursop") return <SoursopBookCover size={size} />;
    if (book.coverComponent === "superfruits") return <SuperfruitsBookCover size={size} />;
    return <BookCover size={size} />;
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-leaf to-leaf-light text-white py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Store", path: "/store" }, { label: "Preview" }]} />
          <div className="grid lg:grid-cols-3 gap-8 items-center mt-4">
            <div className="flex justify-center lg:justify-start">
              {renderCover("md")}
            </div>
            <div className="lg:col-span-2">
              <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">📖 FREE PREVIEW</span>
              <h1 className="font-heading text-2xl lg:text-4xl font-bold leading-tight">{book.title}</h1>
              <p className="text-white/80 mt-3 text-base">{book.subtitle}</p>
              <p className="text-white/70 mt-3 text-sm leading-relaxed max-w-xl">{book.description}</p>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-mango">${book.price}</span>
                  <span className="text-white/50 line-through">${book.originalPrice}</span>
                </div>
                <button onClick={() => navigate(`/checkout/${book.checkoutId}`)} className="bg-mango text-charcoal px-6 py-3 rounded-xl font-bold hover:brightness-110 transition-all shadow-lg">
                  🛒 Buy Full Ebook
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-white/60">
                <span>📄 {book.pages} pages</span>
                <span>📥 Instant PDF download</span>
                <span>💯 30-day money back</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Table of Contents */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
                  <h3 className="font-heading font-bold text-charcoal text-sm">Table of Contents</h3>
                </div>
                <div className="p-2">
                  {book.chapters.map((ch, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveChapter(i)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-all flex items-start gap-2 ${
                        i === activeChapter
                          ? "bg-leaf/10 text-leaf font-semibold"
                          : ch.preview
                          ? "text-charcoal-light hover:bg-gray-50"
                          : "text-charcoal-light/50"
                      }`}
                    >
                      <span className={`flex-shrink-0 mt-0.5 ${i === activeChapter ? "text-leaf" : ""}`}>
                        {ch.preview ? "📖" : "🔒"}
                      </span>
                      <span>Ch. {ch.number}: {ch.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Full TOC */}
              <div className="bg-gradient-to-br from-leaf/5 to-mango/5 rounded-2xl p-4 border border-gray-100">
                <h3 className="font-heading font-bold text-charcoal text-sm mb-3">📋 Full Contents</h3>
                <ol className="space-y-1.5">
                  {book.tableOfContents.map((item, i) => {
                    const isPart = item.startsWith("Part");
                    return (
                      <li key={i} className={`text-xs flex items-start gap-2 ${isPart ? "text-charcoal font-bold mt-2" : "text-charcoal-light"}`}>
                        {!isPart && <span className="text-leaf font-bold flex-shrink-0">{i + 1}.</span>}
                        {isPart && <span className="text-mango flex-shrink-0">📂</span>}
                        {item}
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* CTA */}
              <div className="bg-mango/10 rounded-2xl p-4 border border-mango/20 text-center">
                <p className="text-sm font-semibold text-charcoal mb-2">Enjoying the preview?</p>
                <button onClick={() => navigate(`/checkout/${book.checkoutId}`)} className="btn-primary w-full text-sm">
                  Get Full Book — ${book.price}
                </button>
              </div>
            </div>
          </div>

          {/* Main Content - Chapter Reader */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Chapter Header */}
              <div className="bg-gradient-to-r from-leaf/5 to-mango/5 px-6 lg:px-10 py-6 border-b border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${currentChapter.preview ? "bg-leaf/15 text-leaf" : "bg-gray-200 text-gray-500"}`}>
                    {currentChapter.preview ? "FREE PREVIEW" : "LOCKED"}
                  </span>
                  <span className="text-xs text-charcoal-light">Chapter {currentChapter.number}</span>
                </div>
                <h2 className="font-heading text-xl lg:text-2xl font-bold text-charcoal">{currentChapter.title}</h2>
              </div>

              {/* Chapter Content */}
              <div className="px-6 lg:px-10 py-8">
                {currentChapter.preview ? (
                  <div className="prose prose-sm max-w-none">
                    {currentChapter.content.split("\n\n").map((paragraph, i) => {
                      if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                        return <h3 key={i} className="font-heading font-bold text-charcoal text-lg mt-6 mb-3">{paragraph.replace(/\*\*/g, "")}</h3>;
                      }
                      if (paragraph.startsWith("|")) {
                        const rows = paragraph.split("\n").filter((r) => !r.startsWith("|--") && !r.startsWith("| --") && !r.startsWith("|---"));
                        const headers = rows[0]?.split("|").filter(Boolean).map((h) => h.trim()) || [];
                        const dataRows = rows.slice(1).map((row) => row.split("|").filter(Boolean).map((c) => c.trim()));
                        return (
                          <div key={i} className="overflow-x-auto my-4">
                            <table className="w-full text-sm border-collapse">
                              <thead>
                                <tr className="bg-leaf/5">
                                  {headers.map((h, j) => (
                                    <th key={j} className="text-left px-3 py-2 border border-gray-200 font-semibold text-charcoal">{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {dataRows.map((row, ri) => (
                                  <tr key={ri} className="hover:bg-gray-50">
                                    {row.map((cell, ci) => (
                                      <td key={ci} className="px-3 py-2 border border-gray-200 text-charcoal-light">{cell}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        );
                      }
                      if (paragraph.startsWith("•")) {
                        const items = paragraph.split("\n").filter(Boolean);
                        return (
                          <ul key={i} className="space-y-1.5 my-3">
                            {items.map((item, j) => (
                              <li key={j} className="flex items-start gap-2 text-charcoal-light text-sm leading-relaxed">
                                <span className="text-leaf flex-shrink-0 mt-0.5">•</span>
                                {item.replace(/^• /, "").split("**").map((part, k) => (
                                  k % 2 === 1 ? <strong key={k} className="text-charcoal">{part}</strong> : <span key={k}>{part}</span>
                                ))}
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      if (/^\d+\./.test(paragraph)) {
                        const items = paragraph.split("\n").filter(Boolean);
                        return (
                          <ol key={i} className="space-y-1.5 my-3 list-decimal list-inside">
                            {items.map((item, j) => (
                              <li key={j} className="text-charcoal-light text-sm leading-relaxed">
                                {item.replace(/^\d+\.\s*/, "").split("**").map((part, k) => (
                                  k % 2 === 1 ? <strong key={k} className="text-charcoal">{part}</strong> : <span key={k}>{part}</span>
                                ))}
                              </li>
                            ))}
                          </ol>
                        );
                      }
                      // Regular paragraph with bold handling
                      return (
                        <p key={i} className="text-charcoal-light text-sm leading-relaxed mb-4">
                          {paragraph.split("**").map((part, k) => (
                            k % 2 === 1 ? <strong key={k} className="text-charcoal font-semibold">{part}</strong> : <span key={k}>{part}</span>
                          ))}
                        </p>
                      );
                    })}

                    {/* Chapter navigation */}
                    <div className="mt-10 pt-6 border-t border-gray-100 flex justify-between">
                      {activeChapter > 0 && (
                        <button onClick={() => setActiveChapter(activeChapter - 1)} className="text-sm text-leaf font-medium hover:underline">
                          ← Ch. {book.chapters[activeChapter - 1].number}: {book.chapters[activeChapter - 1].title}
                        </button>
                      )}
                      <div></div>
                      {activeChapter < book.chapters.length - 1 && (
                        <button onClick={() => setActiveChapter(activeChapter + 1)} className="text-sm text-leaf font-medium hover:underline">
                          Ch. {book.chapters[activeChapter + 1].number}: {book.chapters[activeChapter + 1].title} →
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Locked chapter */
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl">🔒</span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-charcoal mb-2">This Chapter is Locked</h3>
                    <p className="text-charcoal-light text-sm max-w-md mx-auto mb-6">{currentChapter.content}</p>
                    <button onClick={() => navigate(`/checkout/${book.checkoutId}`)} className="btn-primary text-base px-8">
                      🛒 Unlock Full Book — ${book.price}
                    </button>
                    <p className="text-xs text-charcoal-light mt-4">Instant PDF download • 30-day money back guarantee</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-leaf to-leaf-light py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-white">Ready for the Full Guide?</h2>
          <p className="text-white/80 mt-3 max-w-xl mx-auto">
            You've read the free preview. Get the complete {book.title} with all chapters, recipes, and resources.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <button onClick={() => navigate(`/checkout/${book.checkoutId}`)} className="bg-mango text-charcoal px-8 py-4 rounded-xl font-bold text-lg hover:brightness-110 transition-all shadow-xl">
              🛒 Get Full Book — ${book.price}
            </button>
            <button onClick={() => navigate("/store")} className="bg-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/30 transition-all border border-white/30">
              📚 View All Books
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
