# Kanban Board - Version Notes

## Version 1.0 - Initial Release
**Date**: 2026-01-03
**File**: `index_v1.0.html`

**Features**:
- Basic Kanban board with 4 columns (To Do, In Progress, Review, Done)
- Drag-and-drop task movement
- Task cards with priority, tags, assignees, due dates, progress bars, subtasks
- AI Chat panel (conversation only, no board editing)
- Task creation modal
- Filter by priority
- Search functionality
- Dark theme matching Gantt chart

---

## Version 2.0 - Agent & Enhanced Features
**Date**: 2026-01-03
**File**: `index.html` (current)
**Backup**: `index_v1.0.html`

**New Features**:
1. **AI Agent with Approval System** ✅
   - Agent parses user input like "Create tasks: Task 1, Task 2, Task 3"
   - Supports "high priority bug: Fix issue" syntax
   - Pending tasks show purple dashed border with "🤖 AI Suggested" label
   - Three buttons per pending task: Keep ✓ | Edit ✎ | Delete ✕
   - Approved tasks become regular tasks (no visual difference)

2. **Excel/CSV Import/Export** ✅
   - Download button (↓) exports all tasks to Excel (.xlsx)
   - Upload button (↑) accepts .csv, .xlsx, .xls files
   - Format compatible with Gantt chart
   - Columns: ID, Title, Description, Status, Priority, Tags, Owners, DueDate, StartDate, EndDate, Progress, Subtasks

3. **Inline Task Creation** ✅
   - Click "+Add task" at bottom of any column
   - Type directly in the input field
   - Press Enter to save, Escape to cancel
   - No modal popup needed

4. **Editable Columns** ✅
   - Click column name to edit it directly
   - Press Enter or click away to save
   - "+" button at end adds new columns
   - Delete button (trash icon) removes columns (tasks move to first column)

5. **Enhanced Owner System** ✅
   - Multiple owners per task (comma-separated)
   - Filter dropdown in header: "All Owners" or specific owner
   - Supports: credentials (JD), full name (John Doe), email (john@email.com)
   - Always displays as 2-letter credentials with color

6. **Quick Done Button** ✅
   - Checkmark (✓) button on each task card header
   - Click to instantly move task to Done column
   - Auto-completes all subtasks and sets progress to 100%

7. **Improved Subtask Editing** ✅
   - Double-click subtask text to edit inline
   - "+" button to add new subtasks
   - "×" button (appears on hover) to delete subtasks
   - Checkbox to toggle completion

---

## Version 2.2 - UI Improvements & Project Management
**Date**: 2026-01-03
**File**: `index.html` (current)
**Backup**: `index_v2.1.html`

**New Features**:
1. **Subtasks Expanded by Default** ✅
   - All subtasks now visible by default
   - Click toggle to collapse if needed

2. **Smooth Task Movement** ✅
   - No page refresh when moving tasks
   - Smooth drag-and-drop experience

3. **Narrower Add Column Button** ✅
   - Reduced from 300px to 60px width
   - Vertical "+" icon with "Add" text

4. **Double-Click Task to Edit** ✅
   - Double-click any task card to open full edit modal
   - Edit title, description, status, priority, due date, owners, tags

5. **Project Management** ✅
   - Multiple projects support
   - Project dropdown in header (folder icon)
   - Create new projects
   - Rename/delete projects
   - Projects saved to localStorage
   - Each project has its own columns and tasks

6. **AI Agent in Header** ✅
   - Prominent AI input box in center of header
   - Purple gradient styling with 🤖 avatar
   - Type commands directly without opening side panel
   - Side panel still available for chat history

7. **Enhanced AI Agent Capabilities** ✅
   - **Background**: "Change background to dark blue" or "#1a1a2e"
   - **Columns**: Add/delete/rename columns
   - **Tasks**: Create/delete/rename/move tasks
   - **Priority**: "Set priority task TASK-001 to high"
   - **Due Dates**: "Set due date task TASK-001 to tomorrow"
   - **Subtasks**: "Add subtask 'Review code' to task TASK-001"
   - **Progress**: Show summary and overdue tasks
   - **Help**: Type "help" for all commands
   - **Logging**: Unsupported requests saved to localStorage for future development

8. **Conversational AI Agent** ✅
   - **Enter/Shift+Enter both send** messages
   - **Always responds** with clear feedback (success/failure/logged)
   - **Answers questions**: "What is task 001?", "How many tasks?", "Who is working on task 002?"
   - **Natural conversation**: Greetings, thanks, general chat
   - **Smart suggestions**: If unsure, suggests possible interpretations
   - **Opens chat panel** when using header input to show conversation
   - **Typing indicator** for more natural feel

9. **FULL Agent Control** ✅ - Agent can do EVERYTHING a human can:
   
   **Tasks:**
   - Create, delete, rename, move, complete, reopen, duplicate tasks
   - Set priority, due date, progress, description
   - Add/remove tags and owners
   
   **Subtasks:**
   - Add, delete, complete, uncomplete subtasks
   
   **Columns:**
   - Add, delete, rename columns
   - Change column colors
   
   **Filters:**
   - Filter by priority or owner
   - Clear all tasks
   
   **Visual:**
   - Change background color

---

## Version 3.0 - Real AI Integration (Perplexity)
**Date**: 2026-01-03
**File**: `index.html` (current)
**Backup**: `index_v2.2_backup.html`

**Major Change**: Replaced rule-based agent with real Perplexity AI

**New Features**:
1. **Perplexity AI Integration** ✅
   - Real LLM-powered agent understands natural language
   - Function calling for board actions
   - Models: Sonar, Sonar Pro, Sonar Reasoning

2. **Two Connection Modes** ✅
   - **Direct**: API key stored in browser (for personal use)
   - **Serverless**: API key on Netlify (for deployment)

3. **Netlify Serverless Support** ✅
   - `netlify/functions/chat.js` - serverless function
   - `netlify.toml` - configuration
   - API key stored securely in environment variables
   - Auto-detects Netlify deployment

4. **Settings Modal Enhanced** ✅
   - Connection mode toggle (Direct/Serverless)
   - Model selection
   - Connection test button

**Files Added**:
- `netlify.toml` - Netlify configuration
- `netlify/functions/chat.js` - Serverless function
- `.gitignore` - Protect sensitive files

**Deployment Instructions**:
1. Push to GitHub
2. Connect to Netlify
3. Add environment variable: `PERPLEXITY_API_KEY`
4. Deploy!

---

## How to Revert
To revert to a specific version, ask: "Revert to Version X.X"
Backup files are stored as `index_vX.X.html`

