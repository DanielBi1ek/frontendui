# Project Timeline and Problem Resolution

This document outlines the development timeline, problems encountered, discoveries made, and solutions implemented during the creation of the **Study Program Page (Supervisor View)** project.

## Timeline of Commits and Problem Resolution

### 1. Initial Setup and Study Program Display
**Date: April 10, 2025**

We started by implementing the display of a study program as a standalone entity. Once this was working, we expanded to show the associated **type** of the program and then its **subjects**.

**Problem:**  
The first challenge appeared when trying to list all subjects in a study program.

**Resolution:**  
We discovered that subjects were available via a list and could be easily iterated over using `.map()`. The issue was quickly resolved.

---

### 2. Understanding and Implementing Mutations
**Date: May 5, 2025**

We began implementing mutations, starting with **creating study programs**.

**Problem:**  
Mutations were throwing errors due to missing required fields like `lastChange`.  
We didn’t initially understand how GraphQL mutations were structured.

**Resolution:**  
After diving deeper into the structure of GraphQL and understanding how mutations are defined and consumed, we successfully implemented create, delete, and update mutations.

---

### 3. Creating New Subjects
**Date: May 16, 2025**

We added functionality to create new **subjects**.

**Discovery:**  
The mutation structure was slightly different from programs but didn’t cause any major issues.

**Resolution:**  
Everything worked as expected after adjusting the mutation fields accordingly.

---

### 4. UI Refinement: Buttons in Card Header
**Date: May 17, 2025**

We wanted to display action buttons inside the **header of the card component** for better UI/UX.

**Problem:**  
Understanding the existing structure of pre-made components was difficult at first.

**Resolution:**  
After exploring the `CardCapsule` and its internal structure, we successfully integrated our buttons in a visually consistent way.

---

### 5. Displaying and Assigning Supervisors (Garant)
**Date: May 28, 2025**

This was one of the most complex parts of the project.

**Problem 1:**  
It took us a long time to figure out what a "garant" entity actually is.

**Discovery:**  
We learned that a supervisor is simply a **User** entity with the role of **Garant**, who belongs to a group of type `program_guarantee`, which is linked to the study program.

**Problem 2:**  
No default supervisors existed in the system, so nothing showed up initially.

**Resolution:**  
We had to implement mutations to **assign supervisors manually**, which required careful navigation through deeply nested GraphQL relationships.

**Problem 3:**  
GraphQL mutations failed frequently because we were attaching users to the wrong entities or using the wrong role/group structure.

**Solution:**  
We reused and customized an existing `UserSearch` component to select users and link them to the appropriate group. After understanding the proper structure, the implementation worked as intended.

---

### 6. Refactoring Component Structure
**Date: June 5, 2025**

**Problem:**  
The overall component structure became somewhat chaotic as the project grew.

**Resolution:**  
We spent time reorganizing the code into proper folders and component groups. This was more of a cleanup task but important for long-term maintainability.

---

### 7. Data Loss after Stack Restart
**Date: June 5, 2025**

**Unresolved Problem:**  
After restarting the development stack (Docker), **supervisors were deleted**, while custom programs and subjects remained.

**Discovery:**  
The platform runs in **demo mode**, and some entities are not persisted correctly.

**Conclusion:**  
This is not a bug within our project but a limitation of the demo environment. This issue will not occur after deployment to a persistent environment.

---

## Lessons Learned

- **GraphQL Mastery:** We gained a solid understanding of how to construct and use GraphQL queries and mutations.
- **Working with Existing Components:** We learned how to read and adapt components that were not built by us.
- **Database Relationships:** Understanding complex entity relationships (User → Role → Group → Program) was critical to solving real-world problems.
- **React and Component Design:** The project helped us deepen our knowledge of React, component composition, and project structure.
- **Soft Skills:** Collaboration, communication, team coordination, and presentation skills were improved through team interactions and final delivery.

---

## Unresolved Issues

- **Entity Persistence:** Supervisor assignments are not retained after restarting the development stack. This is due to the platform running in a non-persistent demo mode.

---

## Summary

This project gave us deep insight into working with large-scale applications and complex data models. We improved both technical and soft skills, and despite several challenges, we delivered a working solution that matched the project specification.
