/**
 * Arabic titles, summaries and source labels for the writing index.
 * Keyed by article slug; bodies live at src/app/(ar)/ar/writing/<slug>/page.mdx.
 */
export const articlesAr: Record<string, { title: string; summary: string; source: string }> = {
  "clip-on-device-dart": {
    title: "تشغيل CLIP على الهاتف، بلغة Dart",
    summary:
      "كيف يبحث تطبيق معرض صور مبني بـ Flutter عن الصور بوصفها دون خادم: مُرمِّز BPE منقول يدويًا، ومُشفِّران بصيغة TFLite خلف isolate عامل، وذاكرة تخزين مؤقت للتضمينات مفتاحها بصمة الملف.",
    source: "Gallery AI",
  },
  "generic-network-repository": {
    title: "دالة مستودع واحدة بدلًا من أربع عشرة",
    summary:
      "غلاف استدعاء عام يعيد Either: يتحقق من الاتصال، ويستدعي المصدر البعيد، ويعود إلى التخزين المؤقت عند الحاجة، ويحوّل الأخطاء إلى إخفاقات، فتتقلّص مستودعات الميزات إلى سطر واحد لكل دالة.",
    source: "Safeer و من بيتي",
  },
  "tests-that-guard-architecture": {
    title: "اختبارات تحرس المعمارية، لا المنطق فقط",
    summary:
      "أربعة اختبارات تمسح الكود المصدري وتفشل حين يبقى حدث Bloc بلا شاشة، أو يُكتب نص عربي مباشرة في الكود، أو ينسى تسجيل الخروج أحد الـ Blocs، أو تعيد إحدى واجهات الـ shell توفير Bloc من مستوى الجذر.",
    source: "fashion_store",
  },
  "prefetching-in-flutter": {
    title: "إخفاء زمن الاستجابة بالجلب المسبق في Flutter",
    summary:
      "جلب بيانات الشاشة التالية بينما لا يزال المستخدم على الشاشة الحالية: أين يفيد، وأين يهدر عرض النطاق، وكيف نُبقيه قابلًا للإلغاء.",
    source: "prefetch_technique_example",
  },
};
