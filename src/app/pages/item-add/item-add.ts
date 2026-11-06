import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';


@Component({
  imports: [CommonModule, FormsModule, RouterModule],
  selector: 'app-item-add',
  styleUrl: './item-add.css',
  templateUrl: './item-add.html',
})
export class ItemAdd {

  newItem: Item = { id: '', name: '', description: '', price: 0 };

  constructor(private itemService: ItemService, private router: Router) { }

  onSubmit(): void {
    if (this.newItem.name.trim()) {
      this.itemService.addItem(this.newItem);
      this.router.navigate(['/']);
    }
  }
}
