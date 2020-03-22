// Create a class for the element
class ListItem extends HTMLElement {
    // Specify observed attributes so that
    // attributeChangedCallback will work
  
    constructor() {
      // Always call super first in constructor
      super();
      this.editContent = this.editContent.bind(this);
      this.readOnlyContent = this.readOnlyContent.bind(this);
      this.deleteSelf = this.deleteSelf.bind(this);
    }
  
    connectedCallback() {
        var self = this;
        if(self.children.length===0){
        var mainContent = document.createElement('div');
        mainContent.setAttribute("draggable","true");
        mainContent.ondragstart = function(ev){
            ev.dataTransfer.setData("list-item", self.id); 
        }

        this.content = document.createElement('textarea');
        this.content.className = "text-content";
        this.content.setAttribute("readonly","true");
        this.content.addEventListener('input', _autoResize, false);
        function _autoResize() { 
            this.style.height = 'auto';     
            this.style.height = this.scrollHeight + 'px'; 
        }
        this.content.onblur = this.readOnlyContent;
        this.content.onclick= this.editContent;
        mainContent.appendChild(this.content);  

        var action = document.createElement('span');
        action.innerHTML="<i class='fa fa-close'></i>";
        action.onclick= this.deleteSelf;
        mainContent.appendChild(action);  
        
        this.appendChild(mainContent);
    }
    }
  
    deleteSelf(){
        this.remove();
    }

    editContent(){
        this.content.removeAttribute('readonly');
    }

    readOnlyContent(){
        this.content.setAttribute('readonly',"true");
    }
    
    setValue(sValue){
        this.content.value=sValue;
    }

    disconnectedCallback() {
     
    }

    attributeChangedCallback(name, oldValue, newValue) {
     
    }
  }
  
  customElements.define('list-item', ListItem);
  