import type { ProjectInput } from "../schema";

export const galleryAi: ProjectInput = {
  slug: "gallery-ai",
  name: "Gallery AI",
  tagline: "An offline photo gallery that understands \"the dog on the beach\", with CLIP running on the phone.",
  year: 2025,
  kind: "ml",
  featured: true,
  role: "Developer in a two-person team; wrote the search, editing and private-album features",
  context: "Independent product, Android and iOS",
  summary:
    "A privacy-first gallery app with natural-language photo and video search that never leaves the device. Two CLIP encoders run through TensorFlow Lite behind a worker isolate, a hand-ported BPE tokenizer turns queries into tokens, and an embedding cache keyed by file hash keeps re-indexing incremental.",
  stack: ["Flutter", "tflite_flutter", "CLIP", "Dart isolates", "photo_manager", "Hive", "ML Kit", "FFmpeg", "flutter_bloc", "Provider"],
  metrics: [
    { label: "Dart files", value: "79" },
    { label: "Lines", value: "12,300" },
    { label: "Models", value: "2 CLIP encoders" },
    { label: "Tokenizer", value: "294 lines of Dart" },
  ],
  diagram: "clip-pipeline",
  honesty: [
    "The CLIP model binaries are not committed to the repository, so it does not build as checked out without them.",
    "Search is a brute-force cosine scan over in-memory embeddings; there is no approximate-nearest-neighbour index, which is fine for tens of thousands of photos and not beyond.",
    "The search screen grew into a 1,600-line widget that should be split; there are no automated tests.",
  ],
  narrative: {
    problem:
      "Phone galleries can find \"photos from March\" but not \"the receipt from the pharmacy\". Cloud photo services can, but they upload everything. The goal was semantic search over local photos and videos with nothing leaving the device, on mid-range Android hardware.",
    requirements:
      "Search by free text in Arabic or English. Index photos and videos in the background without freezing the UI. Re-index only what changed. Work fully offline. Keep the rest of a normal gallery: albums, favorites, a recycle bin, a PIN-locked private album, editing and sharing.",
    constraints:
      "No server. Models had to fit in the app bundle and run through TensorFlow Lite on the CPU. Dart has no CLIP tokenizer, so one had to be written. Memory on cheap phones is tight, so embeddings could not all be recomputed on every launch.",
    architecture:
      "The app is layer-first: Blocs for app-level concerns, ChangeNotifier providers for media state, services for storage and auth. The search pipeline is its own module: a tokenizer, a worker isolate that owns the TFLite interpreters, an embedding cache, and a ranking function. Media access goes through photo_manager with paged loading and off-thread date grouping.",
    decisions:
      "Run inference in a long-lived worker isolate with an explicit message protocol (init, embed job, embed result) instead of compute() per image, so interpreters load once. Port the CLIP byte-level BPE tokenizer to Dart rather than ship a Python runtime or call a server. Cache embeddings as JSON per file keyed by a SHA-1 of the path, with a small index in preferences, so an interrupted index resumes. Index videos by sampling four evenly spaced frames and averaging their embeddings, which is cheap and good enough for retrieval. Translate non-English queries on device with ML Kit before encoding.",
    implementation:
      "Images are decoded and resized to 224×224 in the worker, normalized to the model's expected range, and run through the image encoder. The text encoder takes a 77-token sequence from the tokenizer. Search computes cosine similarity against every cached embedding, applies a threshold and sorts. A Lens-style lookup uses ML Kit image labels to seed a web image search. The private album moves files into the app sandbox behind biometric or PIN authentication stored in secure storage.",
    challenges:
      "Keeping the UI responsive while thousands of images were indexed. Getting tokenization byte-for-byte compatible with the reference implementation so text embeddings matched the image space. Video thumbnails timing out on some devices.",
    solutions:
      "The isolate protocol plus a bounded queue kept the main thread free; the tokenizer was validated against known token ids with a cache for repeated words; each thumbnail extraction got its own completer with a 20-second timeout so one bad file could not stall the batch.",
    results:
      "Natural-language search over local photos and videos, fully offline, with incremental indexing. Localized for Arabic and English with on-device translation of queries. Shipped as a 2.0 build with private album, editing, FFmpeg video trimming and collage tools on top of the search core.",
    lessons:
      "Isolate boundaries are the right unit for ML work in Flutter; the message protocol is more code than compute() but it is the only way to amortize model loading. A tokenizer is a one-time cost that unlocks a whole model family. The next version should move ranking into a small vector index and split the search screen into a Bloc plus widgets so the pipeline becomes testable.",
  },
};
