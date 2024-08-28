class Task < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true

  # タイトルでのあいまい検索
  scope :search, lambda { |title|
    title.present? ? where('title like ?', "%#{title}%") : nil
  }
end
