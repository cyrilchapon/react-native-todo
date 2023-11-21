import { PrimitiveAtom, atom } from "jotai";
import { splitAtom, atomWithStorage, unwrap } from "jotai/utils";
import { v4 as uuidv4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { z } from "zod";
import { createValidatedAsyncJSONStorage } from "./storage";
import { focusAtom } from "jotai-optics";
import { settingsAtom } from "./settings";
import { debouncedSearchAtom, searchAtom } from "./search";

export const todoTaskSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  createdAt: z.string().datetime({ offset: true }).pipe(z.coerce.date()),
  doneAt: z
    .string()
    .datetime({ offset: true })
    .pipe(z.coerce.date())
    .nullable(),
});

export type TodoTask = z.infer<typeof todoTaskSchema>;

const tasksInitialState: TodoTask[] = [
  {
    id: uuidv4(),
    title: "Feed the dragon",
    createdAt: new Date(Date.now()),
    doneAt: null,
  },
  {
    id: uuidv4(),
    title: "Wash the elephant",
    createdAt: new Date(Date.now()),
    doneAt: null,
  },
  {
    id: uuidv4(),
    title: "Water the plants",
    createdAt: new Date(Date.now()),
    doneAt: null,
  },
];

const storage = createValidatedAsyncJSONStorage(z.array(todoTaskSchema))(
  () => AsyncStorage
);

const _tasksAtom = atom(tasksInitialState); // Dumb copy just to grab type
export const tasksAtom = atomWithStorage<TodoTask[]>(
  "tasks",
  tasksInitialState,
  storage
);

const _unwrappedTasksAtom = unwrap(tasksAtom, () => []);
const unwrappedTasksAtom = _unwrappedTasksAtom as unknown as typeof _tasksAtom;

export const tasksSplitAtom = splitAtom(
  unwrappedTasksAtom,
  (taskItem) => taskItem.id
);

export const filteredTasksSplitAtom = atom((get) => {
  const { showDone } = get(settingsAtom);
  const search = get(debouncedSearchAtom);

  let tasksAtoms = get(tasksSplitAtom);

  tasksAtoms = tasksAtoms.filter((taskAtom) => {
    const taskValue = get(taskAtom);

    if (!showDone && taskValue.doneAt != null) {
      return false;
    }

    if (search !== "" && !taskValue.title.includes(search)) {
      return false;
    }

    return true;
  });

  return tasksAtoms;
});

export const clearDoneTasksAtom = atom(null, async (get, set) => {
  const tasks = await get(tasksAtom);
  const undoneTasks = tasks.filter((task) => task.doneAt == null);
  await set(tasksAtom, undoneTasks);
});
