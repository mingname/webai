package com.htnova.aitest.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.htnova.aitest.R

class StatAdapter(
    private val stats: List<Stat>,
    private val onItemClick: (Stat) -> Unit
) : RecyclerView.Adapter<StatAdapter.StatViewHolder>() {

    class StatViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val iconImageView: ImageView = itemView.findViewById(R.id.statIcon)
        val titleTextView: TextView = itemView.findViewById(R.id.statTitle)
        val descriptionTextView: TextView = itemView.findViewById(R.id.statDescription)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): StatViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_stat, parent, false)
        return StatViewHolder(view)
    }

    override fun onBindViewHolder(holder: StatViewHolder, position: Int) {
        val stat = stats[position]

        holder.titleTextView.text = stat.title
        holder.descriptionTextView.text = stat.description

        holder.itemView.setOnClickListener {
            onItemClick(stat)
        }
    }

    override fun getItemCount(): Int = stats.size
}

data class Stat(
    val id: Int,
    val title: String,
    val description: String,
    val iconResId: Int
)
