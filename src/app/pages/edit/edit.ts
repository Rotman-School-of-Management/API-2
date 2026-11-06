import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';

@Component({
  imports: [CommonModule, FormsModule, RouterModule],
  selector: 'app-edit',
  styleUrl: './edit.css',
  templateUrl: './edit.html',
})
export class Edit implements OnInit {
  item!: Item;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const found = this.itemService.getItemById(id);
      if (found) {
        this.item = { ...found }; // Clone object so changes aren't applied unless saved
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  onUpdate(): void {
    if (this.item.name.trim()) {
      this.itemService.updateItem(this.item);
      this.router.navigate(['/']);
    }
  }
}
