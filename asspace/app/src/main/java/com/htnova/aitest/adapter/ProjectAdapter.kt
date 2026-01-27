package com.htnova.aitest.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.htnova.aitest.R

class ProjectAdapter(
    private val projects: List<Project>,
    private val onItemClick: (Project) -> Unit
) : RecyclerView.Adapter<ProjectAdapter.ProjectViewHolder>() {

    class ProjectViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val iconImageView: ImageView = itemView.findViewById(R.id.projectIcon)
        val titleTextView: TextView = itemView.findViewById(R.id.projectTitle)
        val descriptionTextView: TextView = itemView.findViewById(R.id.projectDescription)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ProjectViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_project, parent, false)
        return ProjectViewHolder(view)
    }

    override fun onBindViewHolder(holder: ProjectViewHolder, position: Int) {
        val project = projects[position]

        holder.titleTextView.text = project.title
        holder.descriptionTextView.text = project.description

        holder.itemView.setOnClickListener {
            onItemClick(project)
        }
    }

    override fun getItemCount(): Int = projects.size
}

data class Project(
    val id: Int,
    val title: String,
    val description: String,
    val iconResId: Int
)
