import { BaseActionDispatcher } from '@ainosoft/appops-br-core-components/components/enterprise-grid/dist/enterprise-grid';;

export class TodoActionDispatcher extends BaseActionDispatcher {
 
    constructor() {
        super();
    }

    onRowClick(obj: {}) {
        console.log(' on row click', obj);
    }

    selectRow(obj: {}) {
        console.log(' select row', obj);
    }

    addNewTodo(obj: {}) {
        console.log(' add new todo', obj);
    }

    deleteTodo(obj: {}) {
        console.log('delete todo', obj);
    }

    filterValue(obj: {}) {
        console.log('filter value', obj);
    }

    deleteCheckedTodos(obj: {}) {
        console.log('delete-checked-todos', obj);
    }

    archiveMultipleTodos(obj: {}) {
        console.log('archive multiple todos', obj);
    }

    markAsImportant(obj: {}) {
        console.log('mark as important', obj);
    }

    addStar(obj: {}) {
        console.log('add star', obj);
    }
 }
 