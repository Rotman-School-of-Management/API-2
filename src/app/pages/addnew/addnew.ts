import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';


@Component({
  selector: 'app-addnew',
  imports: [CommonModule, FormsModule, RouterModule],
  styleUrl: './addnew.css',
  templateUrl: './addnew.html',
})
export class Addnew {

  newItem: Item = { id: '', name: '', description: '', price: 0 };

  constructor(private itemService: ItemService, private router: Router) { }

  onSubmit(): void {
    if (this.newItem.name.trim()) {
      this.itemService.addItem(this.newItem);
      this.router.navigate(['/']);
    }
  }
}
