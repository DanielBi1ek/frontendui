
import {ProgramRouterSegment, ProgramPage} from "@ProgramPage";
import {ProgramDetailsPage} from "@ProgramDetailsPage";
//import {ProgramsPage} from "@ProgramsPage";
import {
      createBrowserRouter,
      RouterProvider
} from "react-router-dom";
  
// import { UserRouterSegment } from "@hrbolek/uoisfrontend-ug2";

export const Routes = [
    // UserRouterSegment
    {
        path: "programs/program",
        element: <ProgramPage />
    },
    {
        path: "programs/program/:id",
        element: <ProgramPage />
    },
    {
        path: "/programs/program/view/:id",
        element: <ProgramDetailsPage/>
    },
    ProgramRouterSegment,
]

// const router = createBrowserRouter(Routes, {basename: "/ug"});
const router = createBrowserRouter(Routes);
// const router = createProxyBrowseRouter(Routes, {basename: "/ug"});

export const AppRouter = () => <RouterProvider router={router} />

