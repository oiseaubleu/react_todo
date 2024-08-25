class Task < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true

  # タイトルでのあいまい検索
  scope :task_search, ->(title) { where('title like ?', "%#{title}%") if title.present? }
end
