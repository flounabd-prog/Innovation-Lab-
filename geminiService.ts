
import { GoogleGenAI, Type } from "@google/genai";
import { CreativeSolution } from "../types";

export async function generateCreativeSolution(problemDescription: string): Promise<CreativeSolution> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview", // الترقية لنموذج Pro لضمان أعلى جودة في التفكير المنطقي والتحليلي
      contents: `بصفتك "كبير استراتيجيي الابتكار ومصمم أنظمة التفكير"، مهمتك هي تحليل التحدي التالي: "${problemDescription}"

### بروتوكول الاختيار الجراحي المطور (Advanced Surgical Selection Protocol 4.0):
يجب أن تعتمد في اختيارك للتقنية على "المنطق الإقصائي" والمصفوفة التالية لضمان الدقة:

1. **تشخيص نوع "العقبة" (Constraint Diagnosis):**
   - **تناقض فيزيائي/تقني:** (تحسين السرعة يقلل الجودة) -> [TRIZ].
   - **غموض بنيوي:** (نظام معقد لا نفهم ترابطاته) -> [Morphological Analysis] أو [Mind Mapping].
   - **جمود إدراكي:** (نحن مسجونون في طريقة تفكير قديمة) -> [Lateral Thinking] أو [Random Word].
   - **فجوة تجربة:** (المنتج موجود لكن المستخدم لا يتفاعل) -> [Design Thinking] أو [Empathy Mapping].

2. **تحليل "أفق الابتكار" المطلوب (Innovation Horizon):**
   - **ابتكار تدريجي (Incremental):** تطوير ما هو موجود فعلياً -> [SCAMPER].
   - **ابتكار جذري (Radical):** بناء شيء لم يسبق له مثيل -> [First Principles] أو [Medici Effect].
   - **ابتكار استراتيجي:** تغيير قواعد اللعبة في السوق -> [Blue Ocean Strategy].

3. **قواعد المفاضلة الدقيقة (Selection Rules):**
   - استخدم [Disney Method] بدلاً من [Six Hats] إذا كان التحدي يتطلب انتقالاً بين "الحلم" و"التنفيذ" وليس فقط تقييم فكرة.
   - استخدم [Biomimicry] إذا كانت المشكلة تتعلق بكفاءة الموارد أو التصميم المادي المستلهم من الطبيعة.
   - استخدم [Five Whys] فقط إذا كانت المشكلة متكررة والسبب الجذري مجهول تماماً.
   - استخدم [Reverse Brainstorming] عندما يكون الفريق "واثقاً أكثر من اللازم" ونحتاج لاكتشاف ثغرات الفشل.

### معايير جودة المصفوفة الناتجة:
- **التشخيص الجزيئي**: صنّف المشكلة ليس فقط كعنوان، بل كـ "عطب في النظام".
- **التبرير الإقصائي (Elimination Logic)**: اشرح بوضوح لماذا هذه التقنية هي "المفتاح" الوحيد لهذا "القفل" ولماذا استبعدت التقنيات المشابهة.
- **التنفيذ الواقعي**: يجب أن تكون الخطوات (Practical) وليست مجرد (Theoratical).

المخرجات (JSON باللغة العربية):
{
  "techniqueName": "اسم التقنية المختارة بدقة",
  "techniqueDescription": "شرح فلسفي وعملي عميق للتقنية وكيف ستعمل كمشرط جراحي لحل هذا التحدي",
  "problemClassification": "تصنيف دقيق لبنية العائق (مثال: تناقض بارامترات الجودة والسرعة / فجوة إدراك سلوك المستخدم)",
  "whyChosen": "تحليل استراتيجي يوضح العلاقة بين خصائص المشكلة وميكانيكا عمل التقنية",
  "comparisonReasoning": "تحليل مقارن يوضح لماذا استبعدت البدائل (مثلاً: لماذا TRIZ وليس SCAMPER؟)",
  "steps": [
    { "title": "عنوان الخطوة (إجرائي)", "content": "وصف دقيق، عميق، وشامل لآلية التطبيق في سياق المشكلة" }
  ],
  "finalRecommendation": "نصيحة استراتيجية تمثل (حجر الزاوية) لنجاح هذا الحل",
  "suggestedActionItems": ["مهمة فورية محددة", "مهمة تنفيذية 2", "مهمة تنفيذية 3"]
}`,
      config: {
        responseMimeType: "application/json",
        // تم تعديل الميزانية هنا لأن نموذج gemini-3-pro يتطلب تفعيل التفكير ولا يقبل القيمة 0
        thinkingConfig: { thinkingBudget: 32768 },
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            techniqueName: { type: Type.STRING },
            techniqueDescription: { type: Type.STRING },
            problemClassification: { type: Type.STRING },
            whyChosen: { type: Type.STRING },
            comparisonReasoning: { type: Type.STRING },
            steps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  content: { type: Type.STRING }
                },
                required: ["title", "content"]
              }
            },
            finalRecommendation: { type: Type.STRING },
            suggestedActionItems: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: [
            "techniqueName", "techniqueDescription", "problemClassification", 
            "whyChosen", "comparisonReasoning", "steps", 
            "finalRecommendation", "suggestedActionItems"
          ]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("فشل في استخلاص المصفوفة الإبداعية.");
    
    return JSON.parse(text) as CreativeSolution;
  } catch (err: any) {
    console.error("AI Service Refinement Error:", err);
    throw new Error("حدث خطأ في محرك التحليل الإبداعي. يرجى تجربة صياغة التحدي بشكل أكثر تفصيلاً.");
  }
}
