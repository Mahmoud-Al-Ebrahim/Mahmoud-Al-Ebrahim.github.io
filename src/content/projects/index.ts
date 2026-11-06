import type { ProjectInput } from "../schema";
import { galleryAi } from "./gallery-ai";
import { trydos } from "./trydos";
import { foodly } from "./foodly";
import { fashionStore } from "./fashion-store";
import { safeer } from "./safeer";
import { tiktag } from "./tiktag";
import { revo } from "./revo";
import { mudhhila } from "./mudhhila";

export const projects: ProjectInput[] = [galleryAi, trydos, foodly, mudhhila, fashionStore, safeer, tiktag, revo];
