
import {ProgramRouterSegment, ProgramPage} from "@ProgramPage";
import {SubjectPage} from "@SubjectPage";
import { SubjectRouterSegment } from "../../../packages/subject/src";

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
        element: <ProgramPage isEditable={ false } />
    },
    {
        path: "/programs/program/edit/:id",
        element: <ProgramPage isEditable={ true } />
    },


    ProgramRouterSegment,



    {
        path: "subject/subject/view/:id",
        element: <SubjectPage isEditable={false}/>,
    },

    {
        path: "subject/subject/edit/:id",
        element: <SubjectPage isEditable={true}/>,
    },
    SubjectRouterSegment,


]

// const router = createBrowserRouter(Routes, {basename: "/ug"});
const router = createBrowserRouter(Routes);
// const router = createProxyBrowseRouter(Routes, {basename: "/ug"});

export const AppRouter = () => <RouterProvider router={router} />

